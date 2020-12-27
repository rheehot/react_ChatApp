import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Module을 이용한 유효성 판단
import { useForm } from "react-hook-form";
import firebase from '../../firebase';

function LoginPage() {

    const { register, errors, handleSubmit } = useForm();
    const [loading, setloading] = useState(false);
    const [errorFromSubmit, setErrorFromSubmit] = useState("");

    // data 값에 submit 값들 다 넘겨줌. 그리고 서버와 연결이 필요하므로 비동기로 받음.
    const onSubmit = async (data) => {
        try {
            setloading(true);
            await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
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
    return (
        <div className="auth-wrapper">
            <div style={{ textAlign: 'center' }}>
                <h3>Login</h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Email</label>
                <input name="email" type="email" ref={register({ required: true, pattern: /^\S+@\S+$/i })} />
                {errors.email && <p>이메일에 값이 안들어갔습니다.</p>}
                <label>Password</label>
                <input name="password" type="password" ref={register({ required: true, maxLength: 6 })} />
                {errors.password && errors.password.type === "required" && <p>비밀번호 오류</p>}
                {errors.password && errors.password.type === "maxLength" && <p>비밀번호 길이 오류</p>}
                {errorFromSubmit &&
                    <p>{errorFromSubmit}</p>}
                <input type="submit" disabled={loading} />
            </form>
            <div style={{ textAlign: 'left', width: '375px', margin: '0 auto' }}>
                <Link style={{ color: 'grey', textDecoration: 'none' }} to="/register">아직 아이디가 없다면?</Link>
            </div>
        </div>
    );
}
export default LoginPage;
