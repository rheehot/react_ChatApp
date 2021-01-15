import React, { useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import ProgressBar from 'react-bootstrap/ProgressBar'
import firebase from '../../../firebase'
import mime from 'mime-types'
import { useSelector } from 'react-redux'

const MessageForm = () => {
    const chatRoom = useSelector(state => state.chatRoom.currentChatRoom);
    const user = useSelector(state => state.user.currentUser);

    const [content, setcontent] = useState("");
    const [error, seterror] = useState([]);
    const [loading, setloading] = useState(false);
    const [percentage, setpercentage] = useState(0);


    const messagesRef = firebase.database().ref("messages")
    const inputOpenImageRef = useRef();
    const storageRef = firebase.storage().ref();

    const createMessage = (fileUrl = null) => {
        const message = {
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id: user.uid,
                name: user.displayName,
                image: user.photoURL
            }
        }

        if (fileUrl !== null) {
            message['image'] = fileUrl;
        } else {
            message['content'] = content;
        }
        return message;
    }

    const handleChange = (e) => {
        setcontent(e.target.value)
    }

    const handleSubmit = async () => {
        if (!content) {
            seterror(prev => prev.concat("Type contents first"))
            return;
        }
        setloading(true);
        try {
            await messagesRef.child(chatRoom.id).push().set(createMessage())
            setloading(false)
            setcontent("")
            seterror([])
        } catch (error) {
            seterror(pre => pre.concat(error.message))
            setloading(false)
            setTimeout(() => {
                seterror([])
            }, 5000)
        }

    }

    // 임의로 DOM을 실행해줌.
    const handleOpenImageRef = () => {
        inputOpenImageRef.current.click();
    }
    const handleUploadImage = (e) => {
        const file = e.target.files[0]
        if (!file) return;
        const filePath = `/message/public/${file.name}`;
        const metadata = { contentType: mime.lookup(file.name) };

        try {
            // storage에 저장
            let uploadTask = storageRef.child(filePath).put(file, metadata)

            // 파일 저장되는 퍼센티지 구현하기
            uploadTask.on("state_changed", uploadTaskSnapshot => {
                const percentage = Math.round(
                    (uploadTaskSnapshot.bytesTransferred / uploadTaskSnapshot.totalBytes) * 100
                )
                setpercentage(percentage)
            })
        } catch (error) {
            alert(error)
        }
    }


    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Control
                        value={content}
                        onChange={handleChange}
                        as="textarea" rows={3} />
                </Form.Group>
            </Form>
            {
                !(percentage === 0 || percentage === 100) &&
                <ProgressBar variant="warning" label={`${percentage}%`} now={percentage} />

            }
            <div>
                {error.map(error =>
                    <p style={{ color: 'red' }} key={error}>
                        {error}
                    </p>
                )}
            </div>
            <Row>
                <Col>
                    <button
                        onClick={handleSubmit}
                        className="message-form-button"
                        style={{
                            width: '100%'
                        }}>
                        Send
                    </button>
                </Col>
                <Col>
                    <button
                        onClick={handleOpenImageRef}
                        className="message-form-button"
                        style={{
                            width: '100%'
                        }}>
                        UpLoad
                    </button>
                </Col>
            </Row>
            <input type="file"
                style={{ display: 'none' }}
                ref={inputOpenImageRef}
                onChange={handleUploadImage}
            />
        </div>
    );
}

export default MessageForm;
