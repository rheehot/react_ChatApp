import React, { useState, useEffect } from 'react';
import { FaRegSmileWink } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import firebase from '../../../firebase'
import { setCurrentChatRoom } from '../../../redux/actions/chatRoom_action'

import { useDispatch, useSelector } from 'react-redux';


const ChatRooms = () => {

    const [show, setShow] = useState(false);
    const [Name, setName] = useState("");
    const [Description, setDescription] = useState("");
    const [ChatRoomsRef, setChatRoomsRef] = useState(firebase.database().ref("chatRooms"));
    const [ChatRooms, setChatRooms] = useState([]);
    const [Firstload, setFirstload] = useState("");
    const [ActiveChatRoomid, setActiveChatRoomid] = useState("");


    const user = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();

    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => {
        setShow(true)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid(Name, Description)) {
            addChatRoom();
        }
    }

    const isFormValid = (name, description) =>
        name && description;

    // 현재 채팅 룸 상태 전달
    const changeChatRoom = (room) => {
        dispatch(setCurrentChatRoom(room))
        setActiveChatRoomid(room.id)
    }

    const renderChatRooms = (chatRooms) =>
        chatRooms.length > 0 &&
        chatRooms.map(room => (
            <li
                key={room.id}
                style={{ backgroundColor: room.id === ActiveChatRoomid && "#ffffff45" }}
                onClick={() => changeChatRoom(room)}
            >
                # {room.name}
            </li>
        ))



    const addChatRoom = async () => {
        // setChatRoomsRef(ChatRoomsRef.push().key);
        const key = ChatRoomsRef.push().key;
        const newChatRoom = {
            id: key,
            name: Name,
            description: Description,
            createdBy: {
                name: user.displayName,
                image: user.photoURL
            }
        }
        try {
            await ChatRoomsRef.child(key).update(newChatRoom)
            setShow(false)
            setName("");
            setDescription("");

        } catch (error) {
            alert(error)
        }

    }
    const AddChatRoomsListeners = async () => {
        let chatRoomsArray = [];

        // snapshot 안에 하나 들어감.
        await ChatRoomsRef.on("child_added", DataSnapshot => {
            chatRoomsArray.push(DataSnapshot.val());
            setChatRooms(chatRoomsArray);

            const firstChatRoom = ChatRooms[0]
            if (Firstload && ChatRooms.length > 0) {
                dispatch(setCurrentChatRoom(firstChatRoom))
                setActiveChatRoomid(firstChatRoom.id)
            }
            setFirstload(false);
        })
    }

    // 계속 실행될거
    useEffect(() => {
        AddChatRoomsListeners();

        // 컴포넌트 제거
        return (() => {
            ChatRoomsRef.off();
        })

    }, [])

    return (
        <div>
            <div style={{
                position: 'relative', width: '100%',
                display: 'flex', alignItems: 'center'
            }}>

                <FaRegSmileWink style={{
                    marginRight: 3
                }} />
                CHAT ROOMS {" "} (1)
                <FaPlus
                    onClick={handleShow}
                    style={{
                        position: 'absolute',
                        right: 0,
                        cursor: 'pointer'
                    }}

                />
            </div>

            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {renderChatRooms(ChatRooms)}
            </ul>



            {/* ADD CHAT ROOM MODEL */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Create a chat room
                        </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>방 이름</Form.Label>
                            <Form.Control type="text" onChange={(e) => {
                                setName(e.target.value)
                            }} placeholder="채팅 방 이름을 적어주세요" />

                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>방 설명</Form.Label>
                            <Form.Control type="text" onChange={(e) => {
                                setDescription(e.target.value)
                            }} placeholder="방 설명을 적어주세요" />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        취소
                        </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        방 생성
                        </Button>
                </Modal.Footer>
            </Modal>


        </div >
    );
}

export default ChatRooms;
