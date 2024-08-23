import React, { useState } from 'react';
import Button from './Button';
import './Policy.css';

const Policy = ({ onClose }) => {
    const [isFullScreen, setIsFullScreen] = useState(false);

    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    };

    return (
        <div className={`policy-container ${isFullScreen ? 'fullscreen' : ''}`}>
            <div className="white-box">
                <h3>이용약관</h3>
                <p>
                    제1조 (목적) <br />이 약관은 스마트페이(이하 '회사')가
                    제공하는 결제 서비스(이하 '서비스')의 이용과 관련하여 회사와
                    이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로
                    합니다.
                </p>
                <p>
                    제2조 (이용자의 의무) <br />
                    이용자는 서비스 이용 시 본인의 개인정보를 정확하게
                    제공하여야 하며, 타인의 정보를 도용하거나 부정한 목적으로
                    사용해서는 안 됩니다.
                </p>
                <p>
                    제3조 (서비스의 중단) <br />
                    회사는 천재지변, 시스템 점검, 기타 불가피한 사유가 발생한
                    경우 서비스 제공을 일시 중단할 수 있으며, 이에 따른 손해에
                    대하여 회사는 책임을 지지 않습니다.
                </p>
                <p>
                    제4조 (계약의 해지) <br />
                    이용자는 언제든지 회사에 계약 해지를 요청할 수 있으며, 이
                    경우 회사는 해지 요청일로부터 7일 이내에 모든 결제 관련
                    정보를 삭제하고 서비스를 종료합니다.
                </p>
                <p>
                    제5조 (개인정보의 보호) <br />
                    회사는 이용자의 개인정보를 보호하기 위해 관련 법령에 따라
                    안전한 보안 시스템을 유지하며, 개인정보 유출 방지를 위한
                    모든 조치를 취합니다.
                </p>
                <p>
                    제6조 (관할법원) <br />이 약관에 관한 분쟁이 발생할 경우
                    회사의 본사 소재지를 관할하는 법원을 제1심 관할 법원으로
                    합니다.
                </p>
                <div className="policy-buttons">
                    <Button text="닫기" onClick={onClose} />
                    {/* <Button text="더보기" onClick={toggleFullScreen} /> */}
                </div>
            </div>
        </div>
    );
};

export default Policy;
