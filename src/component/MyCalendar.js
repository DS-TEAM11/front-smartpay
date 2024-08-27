import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './MyCalendar.css'; // 추가된 스타일 시트
import moment from 'moment';

function MyCalendar({ value, onChange }) {
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDateRange, setSelectedDateRange] = useState(value);

    useEffect(() => {
        if (!value) {
            const today = new Date();
            const firstDayOfMonth = new Date(
                today.getFullYear(),
                today.getMonth(),
                1,
            );
            const lastDayOfMonth = new Date(
                today.getFullYear(),
                today.getMonth() + 1,
                0,
            );
            const defaultRange = [firstDayOfMonth, lastDayOfMonth];
            setSelectedDateRange(defaultRange);
            onChange(defaultRange); // 부모 컴포넌트에 기본 날짜 범위 전달
        } else {
            setSelectedDateRange(value);
        }
    }, [value, onChange]);

    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
    };

    const handleDateChange = (dateRange) => {
        setSelectedDateRange(dateRange);
        onChange(dateRange); // 날짜 범위가 변경되면 부모 컴포넌트에 알림
    };

    const formatDateRange = (dateRange) => {
        if (!dateRange || dateRange.length < 2) return '날짜 범위 선택';

        const [startDate, endDate] = dateRange;

        const format = (date) => {
            if (!(date instanceof Date)) return '날짜선택';
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        return `${format(startDate)} ~ ${format(endDate)}`;
    };

    return (
        <div className="mycalendar">
            <button className="btn" onClick={toggleCalendar}>
                <i className="bi bi-calendar4"></i>{' '}
                {formatDateRange(selectedDateRange)}
            </button>
            {showCalendar && (
                <div className="calendar-container">
                    <Calendar
                        onChange={handleDateChange}
                        value={selectedDateRange}
                        formatDay={(locale, date) => moment(date).format('DD')} // 일 생략
                        calendarType="gregory" // 일요일 부터 시작
                        selectRange={true} // 날짜 범위 선택 모드 활성화
                    />
                </div>
            )}
        </div>
    );
}

export default MyCalendar;
