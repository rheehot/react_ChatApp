import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

// Module을 이용한 유효성 판단
import { useForm } from "react-hook-form";
import md5 from 'md5';
import firebase from '../../firebase';

function RegiserPage() {

    const { watch, register, errors, handleSubmit } = useForm();

    const [loading, setloading] = useState(false);
    const [errorFromSubmit, setErrorFromSubmit] = useState("");

    // element 값을 가져올 수 있음. ById, Byclass 값을 가져올 때..
    const password = useRef();
    // data 값에 submit 값들 다 넘겨줌. 그리고 서버와 연결이 필요하므로 비동기로 받음.
    const onSubmit = async (data) => {
        try {
            setloading(true);
            let createdUser = await firebase
                .auth()
                .createUserWithEmailAndPassword(data.email, data.password)

            await createdUser.user.updateProfile({
                displayName: data.name,
                photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
            })

            // Firebase 데이터베이스 저장
            await firebase.database()
                .ref("users")
                .child(createdUser.user.uid)
                .set({
                    name: createdUser.user.displayName,
                    photoURL: createdUser.user.photoURL
                })

            setloading(false);
        }
        catch (error) {
            setErrorFromSubmit(error.message);
            setloading(false);
            setTimeout(() => {
                setErrorFromSubmit("");
            }, 5000)
        }
    }


    password.current = watch("password");
    return (
        <div className="auth-wrapper">
            <div style={{ textAlign: 'center' }}>
                <h3>Register</h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Email</label>
                <input name="email" type="email" ref={register({ required: true, pattern: /^\S+@\S+$/i })} />
                {errors.email && <p>이메일에 값이 안들어갔습니다.</p>}
                <label>Name</label>
                <input name="name" ref={register({ required: true, maxLength: 10 })} />
                {errors.name && errors.name.type === "required" && <p>이름 오류</p>}
                {errors.name && errors.name.type === "maxLength" && <p>이름 길이 오류</p>}
                <label>Password</label>
                <input name="password" type="password" ref={register({ required: true, maxLength: 6 })} />
                {errors.password && errors.password.type === "required" && <p>비밀번호 오류</p>}
                {errors.password && errors.password.type === "maxLength" && <p>비밀번호 길이 오류</p>}
                <label>Password Confirm</label>
                <input name="password_confirm" type="password" ref={register({
                    required: true,
                    validate: (value) =>
                        value === password.current
                })}
                />
                {errors.password_confirm && errors.password_confirm.type === "required" && <p>비밀번호 확인 오류</p>}
                {errors.password_confirm && errors.password_confirm.type === "validate" && <p>비밀번호가 같지 않음</p>}

                {errorFromSubmit &&
                    <p>{errorFromSubmit}</p>}
                <input type="submit" disabled={loading} />
            </form>
            <div style={{ textAlign: 'left', width: '375px', margin: '0 auto' }}>
                <Link style={{ color: 'grey', textDecoration: 'none' }} to="/login">이미 아이디가 있다면?</Link>
            </div>
        </div>
    );
}

export default RegiserPage;