import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

class WebSocketService {
    static instance = null; // 싱글톤 인스턴스

    constructor() {
        if (WebSocketService.instance) {
            return WebSocketService.instance; // 이미 생성된 인스턴스가 있으면 반환
        }

        this.stompClient = null; // Stomp Client
        this.connected = false; // 연결 상태를 추적
        WebSocketService.instance = this; // 싱글톤 인스턴스 설정
    }

    // 웹소켓 서버에 연결
    connect() {
        if (!this.stompClient || !this.connected) {
            this.stompClient = Stomp.over(
                new SockJS('http://localhost:8091/ws'),
            );
            this.stompClient.connect({}, () => {
                console.log('WebSocket connected');
                this.connected = true;
            });
        }
    }

    // 웹소켓 연결 해제
    disconnect() {
        if (this.stompClient && this.connected) {
            this.stompClient.disconnect(() => {
                console.log('WebSocket disconnected');
                this.connected = false;
            });
        }
    }

    // 메시지 구독
    subscribe(destination, callback) {
        if (this.stompClient && this.connected) {
            const subscription = this.stompClient.subscribe(
                destination,
                (message) => {
                    if (message.body) {
                        callback(JSON.parse(message.body)); // 수신한 메시지 처리
                    }
                },
            );

            // 구독 객체 반환 (unsubscribe 메서드를 통해 구독 해제 가능)
            return subscription;
        }
    }

    // 메시지 전송
    sendMessage(destination, message) {
        if (this.stompClient && this.connected) {
            this.stompClient.send(destination, {}, JSON.stringify(message));
        }
    }
}

export const webSocketService = new WebSocketService(); // 싱글톤 인스턴스 생성
