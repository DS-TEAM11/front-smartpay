import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { replace, useNavigate } from 'react-router-dom';
import Button from '../component/Button';
import Order from '../component/Order';
import Header from '../component/Header';
import RecoCard from '../component/RecoCard';
import CardPicker from '../component/homeCards/CardPicker';
import { useLocation } from 'react-router-dom';
import {
    useMemberNo,
    useSelectedCard,
    useWebSocket,
} from '../provider/PayProvider';
import PwdItem from '../component/PwdItem';
import BlackContainer from '../component/BlackContainer';
import Loading from '../component/Loading';
import CustomModal from '../component/common/Modal';
import './Pay.css';

const Pay = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedCard, setSelectedCard } = useSelectedCard();
    const [recommendData, setRecommendData] = useState(location.state.aiData);
    const [purchaseData, setPurchaseData] = useState(
        location.state.purchaseData,
    ); //구매 정보 데이터

    const [aiMode, setaiMode] = useState(location.state.aiMode);
    console.log("결제카드선택페이지에서의 모드: " + aiMode);

    const { wsConnect, wsDisconnect, wsSendMessage, wsSubscribe } =
        useWebSocket();
    const memberNo = useMemberNo();
    // const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [paymentData, setPaymentData] = useState({}); //결제요청할 데이터 해야함

    const [cardCode, setCardCode] = useState(location.state.cardCode);
    const [getIsAi, setGetIsAi] = useState(true);
    const [saveType, setSaveType] = useState(null);
    const [cardInfo, setCardInfo] = useState({
        aiCard: null,
        selectedCard: null,
    });

    const [showCardPicker, setShowCardPicker] = useState(false);
    const [cards, setCards] = useState(); //카드 리스트

    // PwdItem 표시 상태
    const [showPwdItem, setShowPwdItem] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    //모달
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [checkModal, setCheckModal] = useState(true); // 버튼 표시 여부

    const ConfigEnum = Object.freeze({
        PAY_SERVER_URL: process.env.REACT_APP_PAY_SERVER_URL,
        COMPANY_SERVER_URL: process.env.REACT_APP_COMPANY_SERVER_URL,
    });

    const handleCloseModal = () => {
        setShowModal(false);
        setCheckModal(false);
    };

    // 카드 코드와 AI 상태 설정
    useEffect(() => {
        // console.log("AI 카드 코드 확인 =====")
        // console.log(cardCode);

        if (cardCode) {
            setGetIsAi(false);
        } else {
            setGetIsAi(true);
        }
    }, [cardCode]);

    useEffect(() => {
        //카드 정보 가져오는 API 호출
        const getCardInfo = async (code) => {
            try {
                const url = `${ConfigEnum.PAY_SERVER_URL}/api/payment/card`;
                const data = {
                    cardCode: code, //recommenData 추출 해서 넣기(근데 AI 카드가 아닌 경우에는 선택한 카드코드 줘야 함)
                    memberNo: memberNo,
                };
                const response = await axios.post(url, data, {
                    responseType: 'json',
                });
                return response.data;
            } catch (error) {
                console.error(error);
                return {};
            }
        };

        // saveType(useEffect를 따로 분리해야하나?)
        const loadCardData = async () => {
            let aiCardInfo = null;
            let selectedCardInfo = null;

            if (getIsAi) {
                // AI 추천 카드 정보만 가져오기
                aiCardInfo = await getCardInfo(recommendData.recommendCard);
            } else {
                // AI 추천 카드와 선택한 카드 정보 모두 가져오기
                selectedCardInfo = await getCardInfo(cardCode);
                console.log("선택한 카드:", JSON.stringify(cardInfo));

                aiCardInfo = await getCardInfo(recommendData.recommendCard);
            }
            //데이터 담기
            setCardInfo({
                aiCard: aiCardInfo,
                selectedCard: selectedCardInfo,
            });
            // console.log("===============================");
            // console.log(cardInfo);
            // console.log(aiCardInfo);
            // console.log(selectedCardInfo);

            // saveType 설정
            if (recommendData.benefitType === '적립') {
                setSaveType(0);
            } else if (recommendData.benefitType === '할인') {
                setSaveType(1);
            } else if (recommendData.benefitType === '캐시백') {
                setSaveType(2);
            }
        };

        loadCardData();
    }, [
        cardCode,
        recommendData.benefitType,
        recommendData.recommendCard,
        getIsAi,
        memberNo,
    ]);

    //카드 코드 가져오기
    // useEffect(()=> {
    //     console.log()
    //     setCardCode(selectedCard.cardCode);
    // },[selectedCard])

    const getBenefit = {
        maximumBenefits: recommendData.maximumBenefits,
        benefitType: recommendData.benefitType,
    };

    const getPurchase = {
        franchiseName: purchaseData.franchiseName,
        price: purchaseData.purchasePrice,
        product: purchaseData.purchaseItems,
    };

    // 카드 선택 처리
    const handleCardSelect = (card) => {
        // setSelectedCard(card); // CardPicker에서 선택한 카드 설정
        setCardCode(card.cardCode); // 선택된 카드의 코드 설정
        console.log("=======확인용=======");
        console.log(cardCode);
        console.log(card.card_code);
        setShowCardPicker(false); // 카드 선택 후 CardPicker 닫기
    };

    //해당 멤버로 카드 리스트 가져오기
    const handleShowCardPicker = async () => {
        try {
            const response = await axios.get(
                `${ConfigEnum.PAY_SERVER_URL}/api/cards/details/byMember`,
                {
                    params: { memberNo },
                    responseType: 'json', // 응답 타입을 JSON으로 설정
                },
            );
            setCards(response.data);
            // console.log(response.data);
            // console.log(cards);
            setShowCardPicker(true);
        } catch (error) {
            console.error('카드 리스트를 가져오는 데 실패했습니다.', error);
        }
    };

    // PwdItem 컴포넌트
    const handlePwd = async () => {
        setShowPwdItem(true);
    };
    //결제 비밀번호 확인
    const handlePasswordValidation = (isValid) => {
        setShowPwdItem(false);
        if (isValid) {
            setShowPwdItem(false);
            setIsLoading(true);
            handlePayment(); //결제 로직 수행
        } else {
            setModalTitle('알림');
            setModalContent('비밀번호가 일치하지 않습니다.');
            setShowModal(true);
            setCheckModal(true);
        }
    };
    //블랙컨테이너 클릭시 닫기
    const handleOverlayClick = () => {
        setShowPwdItem(false);
    };

    //TODO: 실제 결제 요청 정보 담아야 함
    const handlePayment = async () => {
        let cardNo = '';

        //카드 번호 설정
        if (getIsAi) {
            cardNo = cardInfo.aiCard.lastNums;
        } else {
            cardNo = cardInfo.selectedCard.lastNums;
        }

        const paymentData = {
            orderNo: purchaseData.orderNo, //이전에서 받아와야 함?
            price: purchaseData.purchasePrice, //이것도 판매자
            product: purchaseData.purchaseItems, //판매자
            cardNo: cardNo, //cardInfo 받아올때 card_no를 풀로 받아와야 할 듯 => ai일때와 선택카드일 때 잘 변경해서 넣어줘야 하는데 어떻게 해야할까
            cardCode: getIsAi ? recommendData.recommendCard : cardCode, //cardInfo에서
            getIsAi: getIsAi, //이전 구매자 QR 생성부터 들고 와야 함
            payDate: purchaseData.payDate, //판매자 쪽에서
            saveType: getIsAi ? saveType : null, //여기서 AI 결과 값에 따라 자바스트립트로 처리 해야 할 듯
            savePrice: getIsAi ? recommendData.maximumBenefits : null, //AI 정보
            franchiseName: purchaseData.franchiseName, //판매자
            franchiseCode: purchaseData.franchiseCode, //판매자
            memberNo: memberNo,
        };
        console.log('결제 로직 들어왔음', cardNo);
        console.log('결제 데이터', paymentData);
        try {
            const response = await axios.post(
                `${ConfigEnum.PAY_SERVER_URL}/api/payment/request`,
                paymentData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );
            const paymentStatus = [
                'successPay',
                'cardMismatch',
                'expirationDate',
                'overLimit',
                'etcError',
            ]; // 결제 상태
            const result = paymentStatus[response.data]; // API가 반환하는 return 값(결제 상태)


            // console.log(paymentStatus);

            const orderNo = paymentData.orderNo;

            // WebSocket 연결 후 구독 설정
            // 결제 정보 메시지 전송
            wsSendMessage(`/topic/sellinfo`, {
                action: 'payInfo',
                to: 'seller',
                from: memberNo,
                data: result,
                link: `/pay/receipt?orderNo=${orderNo}`,
            });

            //웹소켓 끝 ------------------------------
            console.log(response.data);
            if (response.data === 0) {
                // 결제 성공
                // alert('결제가 완료되었습니다.');
                setModalTitle('결제 완료');
                setModalContent('결제가 완료되었습니다.');
                setShowModal(true);
                setCheckModal(false);
                // setPaymentSuccess(true);
                // setPaymentData(response.data);
                navigate(`/pay/receipt?orderNo=${orderNo}`, { replace: true });
                //결제 요청 값? 데이터 그대로 보내줘? 아님 쿼리파라미터로 달아서 페이지 이동? -> receipt에서는 파라미터 값 가져와서 API 호출?
            } else if (response.data === 1) {
                // 카드 불일치
                setIsLoading(true);
                // alert('결제 실패: 카드 정보 불일치 다시 시도해주세요');
                setModalTitle('결제 실패');
                setModalContent('카드 정보 불일치\n다시 시도해주세요');
                setShowModal(true);
                setCheckModal(false);
                timeout();
            } else if (response.data === 2) {
                // 유효기간 만료
                // alert('결제 실패:  유효기간 만료  다시 시도해주세요');
                setModalTitle('결제 실패');
                setModalContent('유효기간 만료\n다시 시도해주세요');
                setShowModal(true);
                setCheckModal(false);
                timeout();
            } else if (response.data === 3) {
                // 한도 초과
                // alert('결제 실패: 카드 한도 초과  다시 시도해주세요');
                setModalTitle('결제 실패');
                setModalContent('카드 한도 초과\n다시 시도해주세요');
                setShowModal(true);
                setCheckModal(false);
                timeout();
            } else {
                // 예외 에러
                // alert('결제 실패: 서버 에러 발생  다시 시도해주세요');
                setModalTitle('결제 실패');
                setModalContent('서버 에러 발생\n다시 시도해주세요');
                setShowModal(true);
                setCheckModal(false);
                timeout();
            }
        } catch (error) {
            console.log('에러');
            setModalTitle('결제 실패');
            setModalContent('서버 에러 발생\n다시 시도해주세요');
            setShowModal(true);
            setCheckModal(false);
            timeout();
        }
    };

    // const handleHomeClick = () => {
    //     navigate('/home'); // /home 경로로 이동
    // };
    const timeout = () => {
        setTimeout(() => {
            navigate('/home');
        }, 1500);
    };

    return (
        <div className="Pay">
            {showModal && (
                <CustomModal
                    key={modalTitle + modalContent}
                    title={modalTitle}
                    content={modalContent}
                    check={checkModal}
                    onClose={handleCloseModal}
                />
            )}
            {isLoading && <Loading text={'결제 진행 중입니다.'} />}
            {showPwdItem && (
                <>
                    <BlackContainer onClick={handleOverlayClick} />
                    <PwdItem Success={handlePasswordValidation} />
                </>
            )}
            <Header />
            <Order
                getCardInfo={cardInfo}
                getBenefit={getBenefit}
                getPurchase={getPurchase}
                getIsAi={getIsAi}
                aiMode={location.state.aiMode}
            />

            <div className="d-flex justify-content-center">
                <div className="col-10 row">
                    {getIsAi && (
                        <div className="p-2 px-4 aiInfo">
                            <p>{recommendData.detailExplanation}</p>
                        </div>
                    )}
                    <Button onClick={handlePwd} text={'이 카드로 결제하기'} />

                    <p
                        className="text-decoration-underline text-end mt-2 p-0"
                        onClick={handleShowCardPicker}
                    >
                        다른 카드 선택하기
                    </p>
                </div>
            </div>
            {showCardPicker && (
                <CardPicker
                    onRemove={() => setShowCardPicker(false)}
                    cards={cards}
                    onCardSelect={handleCardSelect}
                />
            )}
            {!getIsAi && (
                <RecoCard
                    recommendData={recommendData}
                    setCardCode={setCardCode}
                />
            )}
        </div>
    );
};

export default Pay;
