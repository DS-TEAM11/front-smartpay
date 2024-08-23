import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function MyCalendar() {
    const [value, setValue] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);

    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
    };

    return (
        <div>
            <button onClick={toggleCalendar}>
                {showCalendar ? '달력숨기기' : '날짜조회'}
            </button>
            {showCalendar && (
                <div className="calendar-container">
                    <Calendar onChange={setValue} value={value} />
                </div>
            )}
        </div>
    );
}

export default MyCalendar;
