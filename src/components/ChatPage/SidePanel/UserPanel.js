import React, { useRef } from 'react';
import { GoComment } from 'react-icons/go'
import Dropdown from 'react-bootstrap/Dropdown'
import Image from 'react-bootstrap/Image'
import { useSelector } from 'react-redux';
import firebase from '../../../firebase'
import mime from 'mime-types';

const UserPanel = () => {

    const user = useSelector(state => state.user.currentUser)

    const handleLogout = () => {
        firebase.auth().signOut();
    }

    const inputOpenImageRef = useRef();

    const handleOpenImageRef = () => {
        inputOpenImageRef.current.click();
    }

    const handleUploadImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const metadata = { contentType: mime.lookup(file.name) };
        // 스토리지 파일 저장

        try {
            let uploadTaskSnapshot = await firebase.storage().ref()
                .chlid(`user_image/${user.uid}`) // 저장 경로
                .put(file, metadata)

            console.log(uploadTaskSnapshot)
        } catch (error) {

        }


    }


    return (
        <div>
            {/* Logo */}

            <h3 style={{ color: 'white' }}>
                <GoComment /> {" "} Chat App
            </h3>
            <div style={{ display: 'flex', marginBottom: '1rem' }}>
                <Image src={user && user.photoURL} style={{ width: '30px', height: '30px', marginTop: '3px' }} roundedCircle />
                <Dropdown>
                    <Dropdown.Toggle style={{ background: 'transparent', border: '0px' }} id="dropdown-basic">
                        {user && user.displayName}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleOpenImageRef}>프로필 사진변경</Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout} >로그아웃</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            {/* 클릭을 못하는 상황 display: none 이것을 이용함. */}
            <input
                accept="image/jpeg, image/png"
                type="file"
                ref={inputOpenImageRef}
                style={{ display: "none" }}
                onChange={handleUploadImage}
            />
        </div>
    );
}

export default UserPanel;
