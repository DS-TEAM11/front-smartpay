import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
class WebSocketService {
    constructor() {
        this.stompClient = null;
        this.connected = false;
    }

    connect = (onConnectCallback) => {
        if (!this.stompClient || !this.connected) {
            const socket = new SockJS('http://localhost:8091/ws');
            this.stompClient = Stomp.over(socket);
            this.stompClient.connect(
                {},
                (frame) => {
                    // console.log('WebSocket 연결됨: ', frame); // 연결 성공 확인
                    this.connected = true;
                    // console.log('onConnectCallback 실행', onConnectCallback);
                    if (onConnectCallback) {
                        onConnectCallback(); // 연결 후 구독 콜백 실행
                    }
                },
                (error) => {
                    console.error('WebSocket connection error:', error); // 연결 실패 로그
                },
            );
        }
    };

    // WebSocket 구독
    subscribe = (destination, callback) => {
        if (this.connected && this.stompClient) {
            console.log(`구독 시작: ${destination}`); // 구독 시작 로그
            return this.stompClient.subscribe(destination, (message) => {
                console.log('서버가 받은 메시지: ', JSON.parse(message.body)); // 메시지 수신 로그
                callback(JSON.parse(message.body));
            });
        } else {
            console.error('WebSocket is not connected. Cannot subscribe.');
        }
    };

    // WebSocket 메시지 전송
    sendMessage(destination, message) {
        if (this.connected && this.stompClient) {
            this.stompClient.send(destination, {}, JSON.stringify(message));
        } else {
            console.error('WebSocket is not connected.');
        }
    }

    // WebSocket 연결 해제
    disconnect() {
        if (this.stompClient && this.connected) {
            this.stompClient.disconnect(() => {
                console.log('Disconnected');
                this.connected = false;
            });
        }
    }
}

export const webSocketService = new WebSocketService();
