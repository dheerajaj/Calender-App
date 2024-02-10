import React, { useState, useEffect } from 'react';
import './Calender.css'; import { DateTime } from 'luxon';
import TimePart from './TimePart';
import data from '../JSON/Events.json';

console.log(data);

const TimezoneSelector = ({ onChange }) => {
    const [selectedTimezone, setSelectedTimezone] = useState('UTC');

    const handleTimezoneChange = (e) => {
        const newTimezone = e.target.value;
        setSelectedTimezone(newTimezone);
        onChange(newTimezone);
    };

    return (
        <div style={{marginLeft:"20px"}}>
            <label>Select Timezone:</label>
            <select style={{ width: '460px', height: '30px' }} value={selectedTimezone} onChange={handleTimezoneChange}>
                <option value="UTC">UTC</option>
                <option value="UTC+1">UTC+1</option>
                <option value="UTC+2">UTC+2</option>
                <option value="UTC+3">UTC+3</option>
                <option value="UTC+4">UTC+4</option>
                <option value="UTC+5">UTC+5</option>
                <option value="UTC+6">UTC+6</option>
                <option value="UTC+7">UTC+7</option>
                <option value="UTC+8">UTC+8</option>
                <option value="UTC+9">UTC+9</option>
                <option value="UTC+10">UTC+10</option>
            </select>
        </div>
    );
};

const WeekDays = ({ startDate }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedTimezone, setSelectedTimezone] = useState('UTC');
    const [prevWeekDate, setPrevWeekDate] = useState();
    const [nextWeekDate, setNextWeekDate] = useState();

    const handleNextWeek = () => {
        setCurrentDate((currentDate) => {
            const newDate = new Date(currentDate);
            newDate.setDate(newDate.getDate() + 7);
            newDate.setDate(newDate.getDate() - newDate.getDay() + (newDate.getDay() === 0 ? -6 : 1));

            setPrevWeekDate(new Date(newDate));
            setNextWeekDate(undefined);

            return newDate;
        });
    };
    
    const handlePreviousWeek = () => {
        setCurrentDate((currentDate) => {
            const newDate = new Date(currentDate);
            newDate.setDate(newDate.getDate() - 7);
            newDate.setDate(newDate.getDate() - newDate.getDay() + (newDate.getDay() === 0 ? -6 : 1));

            setPrevWeekDate(undefined);
            setNextWeekDate(new Date(newDate));

            return newDate;
        });
    };


    const handleTimezoneChange = (newTimezone) => {
        setSelectedTimezone(newTimezone);
    };

    const getWeekDates = () => {
        const weekStart = new Date(currentDate);
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());
        const weekDates = [...Array(7)].map((_, index) => new Date(weekStart.setDate(weekStart.getDate() + 1)));
        const weekDays = weekDates.filter((day) => day.getDay() >= 1 && day.getDay() <= 5);
        return weekDays;
    };

    const formatEventTime = (eventTime) => {
      
        if (currentDate) {
            const eventDate = new Date(`${currentDate.toISOString().split('T')[0]}T${eventTime}`);
            const formattedEventTime = DateTime.fromJSDate(eventDate, { zone: selectedTimezone }).toLocaleString(DateTime.TIME_SIMPLE);

            return formattedEventTime;
        }
        return ''; 
    };

    useEffect(() => {
        console.log('Fetching events for the current week and timezone:', currentDate, selectedTimezone);
    }, [currentDate, selectedTimezone]);



    return (
        <div className="calendar-container">
        <div className="upper-half">
        <button className='nav-button' onClick={handlePreviousWeek}>Previous Week</button>
        <span className="current-date">Today's Date: {new Date().toLocaleDateString()}</span>
        <button className='nav-button' onClick={handleNextWeek}>Next Week</button>
    </div>
            <div className="time-zone">
                <TimezoneSelector onChange={handleTimezoneChange} />
            </div>
            <div className="week-events">
                {getWeekDates().map((date) => (
                    <div key={date.toISOString()} className="day-events">
                        <div>
                            <p className="date-label">{date.toDateString()}</p>
                        </div>
                        {data.map((event) => (
                            <div key={event.Id} className="event-details">
                                {new Date(event.Date).toDateString() === date.toDateString() && (
                                    <>
                                        <p className="event-name">{event.Name} - {formatEventTime(event.Time)}</p>
                                        <input type="checkbox" className="checkbox" defaultChecked={true} />
                                    </>
                                )}
                            </div>
                        ))}
                        <TimePart
                            date={date}
                            selectedTimezone={selectedTimezone}
                            rows={1}
                        />
                    </div>
                ))}
            </div>
        </div>
    );

};

WeekDays.defaultProps = {
    rows: 1,
};

export default WeekDays;