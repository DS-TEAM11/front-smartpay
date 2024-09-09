import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Stomp } from '@stomp/stompjs';
// import { Stomp } from 'stompjs';

function Chat() {
    const stompClient = useRef(null);
    // 채팅 내용들을 저장할 변수
    const [messages, setMessages] = new useState([]);
    // 사용자 입력을 저장할 변수
    const [inputValue, setInputValue] = useState('');
    // 입력 필드에 변화가 있을 때마다 inputValue를 업데이트
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const ConfigEnum = Object.freeze({
        PAY_SERVER_URL: process.env.REACT_APP_PAY_SERVER_URL,
        COMPANY_SERVER_URL: process.env.REACT_APP_COMPANY_SERVER_URL,
    });

    // 웹소켓 연결 설정
    const connect = () => {
        const socket = new WebSocket('ws://localhost:8091/ws');
        stompClient.current = Stomp.over(socket);
        stompClient.current.connect({}, () => {
            stompClient.current.subscribe(`/sub/chatroom/1`, (message) => {
                const newMessage = JSON.parse(message.body);
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            });
        });
    };

    // 웹소켓 연결 해제
    const disconnect = () => {
        if (stompClient.current) {
            stompClient.current.disconnect();
        }
    };

    // 기존 채팅 메시지를 서버로부터 가져오는 함수
    const fetchMessages = () => {
        return axios
            .get(`${ConfigEnum.PAY_SERVER_URL}/chat/1`)
            .then((response) => {
                console.log(response.data); // 응답 데이터 로그
                setMessages(response.data);
            })
            .catch((error) => {
                console.error(
                    'There was an error fetching the messages!',
                    error,
                );
            });
    };

    useEffect(() => {
        connect();
        fetchMessages();

        // 컴포넌트 언마운트 시 웹소켓 연결 해제
        return () => disconnect();
    }, []);

    //메세지 전송
    const sendMessage = () => {
        if (stompClient.current && inputValue) {
            const body = {
                id: 1,
                name: '테스트1',
                message: inputValue,
            };
            stompClient.current.send(`/pub/message`, {}, JSON.stringify(body));
            setInputValue('');
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-box">
                <ul className="message-list">
                    {/* 메시지 리스트 출력 */}
                    {messages.map((item, index) => (
                        <div key={index} className="message-item">
                            {item.message}
                        </div>
                    ))}
                </ul>
                <div className="input-box">
                    {/* 입력 필드 */}
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        className="chat-input"
                        placeholder="메시지를 입력하세요..."
                    />
                    {/* 메시지 전송, 메시지 리스트에 추가 */}
                    <button onClick={sendMessage} className="send-button">
                        입력
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chat;
