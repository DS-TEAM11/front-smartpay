import React, { useState } from 'react';
import Header from '../component/Header';
import SockJS from 'sockjs-client';
import { Client, Stomp } from '@stomp/stompjs';
import Button from '../component/Button';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Test = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const memberNo = queryParams.get('memberNo');
    const purchase_data = {
        franchiseCode: '10003', //편의점 계열
        franchiseType: '편의점',
        franchiseName: 'GS25 - 동교점',
        purchaseItems: '스타벅스 스탠리 텀블러',
        purchasePrice: 39000,
        memberNo: memberNo,
    };

    const socket = new SockJS('http://localhost:8091/ws');
    const stompClient = Stomp.over(socket);
    function send_enter() {
        stompClient.send(
            '/topic/sellinfo',
            {},
            JSON.stringify({ message: 'seller enter' }),
        );
    }
    function send_information() {
        stompClient.send(
            '/topic/sellinfo',
            {},
            JSON.stringify({
                message: 'purchase information',
                data: purchase_data,
            }),
        );
    }
    //판매자 사이트 접속으로 침
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/sellinfo', function (message) {
            const body = JSON.parse(message.body);
            console.log('message:', body);
            if (body.message === 'purchase end') {
                var confirm_ = window.confirm('결제가 완료되었습니다.');
                if (confirm_) {
                    window.location.href = 'http://localhost:3000/pay/receipt';
                }
            }
        });
        //TODO: sellinfo로 값 전달하고 서버에서 받는거 테스트 필요
        //받은 값 기반으로 서버 로직 돌리고 리턴값 받는거 테스트 필요
    });
    return (
        <>
            <Button onClick={send_enter} text={'접속했을 때'}></Button>
            <Button onClick={send_information} text={'입력 완료 시'}></Button>
        </>
    );
};
export default Test;
