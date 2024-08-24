import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import Button from './Button';
import 'react-calendar/dist/Calendar.css';
import './MyCalendar.css'; // 추가된 스타일 시트

function MyCalendar({ value, onChange }) {
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(value);

    useEffect(() => {
        setSelectedDate(value);
    }, [value]);

    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        onChange(date); // 날짜가 변경되면 부모 컴포넌트에 알림
    };

    const formatDate = (date) => {
        if (!date) return '날짜 선택';
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <div className="my-calendar-container">
            <button className="btn" onClick={toggleCalendar}>
                <i class="bi bi-calendar4"></i>{' '}
                {selectedDate ? formatDate(selectedDate) : '최근 일주일'}
            </button>
            {showCalendar && (
                <div className="calendar-container">
                    <Calendar
                        onChange={handleDateChange}
                        value={
                            selectedDate instanceof Date
                                ? selectedDate
                                : new Date()
                        }
                    />
                </div>
            )}
        </div>
    );
}

export default MyCalendar;
