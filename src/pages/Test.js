import React from 'react';
import Header from '../component/Header';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
let socket = new SockJS('http://localhost:8091/ws');
let stompClient = Stomp.over(socket);
stompClient.connect({}, function (frame) {
    console.log('Connected: ' + frame);
    stompClient.subscribe('/topic/sellinfo', function (message) {
        console.log('message:', message);
    });
    //TODO: sellinfo로 값 전달하고 서버에서 받는거 테스트 필요
    //받은 값 기반으로 서버 로직 돌리고 리턴값 받는거 테스트 필요
});

const Test = () => {
    return <></>;
};
export default Test;
