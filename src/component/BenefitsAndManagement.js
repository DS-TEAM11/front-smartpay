import React, { useState, useEffect } from 'react';
import Benefits from '../component/Benefits';
import ManagementItem from '../component/ManagementItem';
import './BenefitsAndManagement.css';
import { useConfig, useMemberNo } from '../provider/PayProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const BenefitsAndManagement = ({ benefits, managementItems }) => {
    const memberNo = useMemberNo();
    const { PAY_SERVER_URL } = useConfig();
    const [memberInfo, setMemberInfo] = useState(null);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const navigate = useNavigate();
    const benefitClick = (className) => {
        navigate(`/mypage?tab=${className}`);
    };
    useEffect(() => {
        const fetchMemberInfo = async () => {
            if (memberNo) {
                // memberNo가 유효한지 확인
                try {
                    const response = await axios.post(
                        `${PAY_SERVER_URL}/member/getMemberInfo`,
                        null,
                        {
                            params: {
                                memberNo: memberNo,
                            },
                        },
                    );
                    // console.log('응답데이터', response.data);
                    setMemberInfo(response.data); // 응답 데이터로 상태 업데이트
                } catch (error) {
                    console.error('Error fetching member info:', error);
                    return null; // 에러 발생 시 null 반환
                } finally {
                    setLoading(false); // 데이터 로딩이 완료되면 로딩 상태를 false로 설정
                }
            }
        };
        fetchMemberInfo(); // 비동기 함수 호출
    }, [memberNo, PAY_SERVER_URL]);
    if (loading) return <div>로딩중...</div>;
    if (!memberInfo) {
        return <div>Error: 회원 정보를 불러오지 못했습니다.</div>; // 회원 정보가 없을 때 표시할 UI
    }
    return (
        <div className="benefits-management-container">
            <div className="benefits-section">
                <h3>
                    <b>{memberInfo.name}님</b>이 이번달에 받은 혜택 모아보기
                </h3>
                <div className="benefits-items">
                    {benefits.map((benefit, index) => (
                        <Benefits
                            className={benefit.className}
                            key={index}
                            imageSrc={benefit.imageSrc}
                            description={benefit.description}
                            onClick={() => benefitClick(benefit.className)}
                        />
                    ))}
                </div>
            </div>
            <div className="management-section">
                <h3>카드 관리하기</h3>
                <div className="management-items">
                    {managementItems.map((item, index) => (
                        <ManagementItem
                            key={index}
                            imageSrc={item.imageSrc}
                            description={item.description}
                            onClick={item.onClick}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BenefitsAndManagement;
