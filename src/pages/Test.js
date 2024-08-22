import React from 'react';
import Header from '../component/Header';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import Button from '../component/Button';
const socket = new SockJS('http://localhost:8091/ws');
const stompClient = Stomp.over(socket);
function send() {
    stompClient.send(
        '/topic/sellinfo',
        {},
        JSON.stringify({ message: '거래요청' }),
    );
}
function send2() {
    stompClient.send(
        '/topic/sellinfo',
        {},
        JSON.stringify({ message: '정보입력완료' }),
    );
}
//판매자 사이트 접속으로 침
stompClient.connect({}, function (frame) {
    console.log('Connected: ' + frame);
    stompClient.subscribe('/topic/sellinfo', function (message) {
        const body = JSON.parse(message.body);
        console.log('message:', body);
    });
    //TODO: sellinfo로 값 전달하고 서버에서 받는거 테스트 필요
    //받은 값 기반으로 서버 로직 돌리고 리턴값 받는거 테스트 필요
});

const Test = () => {
    return (
        <>
            <Button onClick={send} text={'접속했을 때'}></Button>
            <Button onClick={send2} text={'입력 완료 시'}></Button>
        </>
    );
};
export default Test;
