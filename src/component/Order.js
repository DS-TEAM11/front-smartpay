import './Order.css';

const Order = ({}) => {
    const franchise = 'GS25';
    const testprice = 150000;
    const testsave = 300;
    const testtype = '적립';
    const CardImg =
        'https://d1c5n4ri2guedi.cloudfront.net/card/13/card_img/28201/13card.png';
    const CardCo = '신한';
    const CardLastNo = 1234;
    const CardName = '신한카드 Mr.Life';
    const CardNick = 'CardNick';

    const isAIRecommended = true; // AI 추천 여부를 나타내는 변수
    let FirstMessage;
    let SecondMessage;
    let ThirdMessage;

    if (isAIRecommended) {
        FirstMessage = <>AI 추천 카드로</>;
        SecondMessage = (
            <>
                <span className="blue-text"> {franchise}</span>
                에서
                <span className="blue-text"> {testprice}원</span>
            </>
        );
        ThirdMessage = (
            <>
                결제하고
                <span className="blue-text"> {testsave}원</span>
                <span className="blue-text"> {testtype} </span>
                받을게요.
            </>
        );
    } else {
        FirstMessage = <>선택한 카드로</>;
        SecondMessage = (
            <>
                <span className="blue-text"> {franchise}</span>
                에서
                <span className="blue-text"> {testprice}원</span>
            </>
        );
        ThirdMessage = <>결제할게요.</>;
    }

    return (
        <>
            <section className="position-relative overflow-hidden pb-0 pt-xl-9">
                <div className="container pt-4 pt-sm-5">
                    <div className="Order">
                        <h4>{FirstMessage}</h4>
                        <h4>{SecondMessage}</h4>
                        <h4>{ThirdMessage}</h4>
                        <div className="d-flex flex-column align-items-center mt-4">
                            <img
                                src={CardImg}
                                alt="CardImg"
                                className="img-fluid "
                            />
                            <div className="card-info-container2">
                                <span>{CardNick}</span>
                                <span>
                                    {CardCo} ({CardLastNo})
                                </span>
                            </div>
                        </div>
                        <h4 className="text-center mt-3">{CardName}</h4>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Order;
