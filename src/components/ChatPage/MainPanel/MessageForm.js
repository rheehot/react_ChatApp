import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import ProgressBar from 'react-bootstrap/ProgressBar'

const MessageForm = () => {
    return (
        <div>
            <Form>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
            </Form>

            <ProgressBar variant="warning" label="60%" now={60} />

            <Row>
                <Col>
                    <button
                        className="message-form-button"
                        style={{
                            width: '100%'
                        }}>
                        Send
                    </button>
                </Col>
                <Col>
                    <button
                        className="message-form-button"
                        style={{
                            width: '100%'
                        }}>
                        UpLoad
                    </button>
                </Col>
            </Row>
        </div>
    );
}

export default MessageForm;
