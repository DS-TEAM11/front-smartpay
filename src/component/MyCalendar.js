import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function MyCalendar({ value, onChange }) {
    const [showCalendar, setShowCalendar] = useState(false);

    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
    };

    return (
        <div>
            <button onClick={toggleCalendar}>
                {showCalendar ? '달력 숨기기' : '날짜 조회'}
            </button>
            {showCalendar && (
                <div className="calendar-container">
                    <Calendar onChange={onChange} value={value} />
                </div>
            )}
        </div>
    );
}

export default MyCalendar;
