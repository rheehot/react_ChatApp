import React from 'react';
import { GoComment } from 'react-icons/go'
import Dropdown from 'react-bootstrap/Dropdown'
import Image from 'react-bootstrap/Image'
import { useSelector } from 'react-redux';


const UserPanel = () => {

    const user = useSelector(state => state.user.currentUser)


    return (
        <div>
            {/* Logo */}

            <h3 style={{ color: 'white' }}>
                <GoComment />
            </h3>
            <div style={{ display: 'flex', marginBottom: '1rem' }}>
                <Image src={user && user.photoURL} style={{ width: '30px', height: '30px', marginTop: '3px' }} roundedCircle />
                <Dropdown>
                    <Dropdown.Toggle style={{ background: 'transparent', border: '0px' }} id="dropdown-basic">
                        {user && user.displayName}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item >프로필 사진변경</Dropdown.Item>
                        <Dropdown.Item >로그아웃</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
}

export default UserPanel;
