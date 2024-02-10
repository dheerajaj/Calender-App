import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import WeekDays from './Weekdays';

const CalendarDisplay = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date()); 

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1));
    setCurrentDate(startOfWeek);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Calendar</h1>
      <div style={styles.calendarContain}>
        <Calendar onClickDay={handleDateClick} style={styles.calendar} />
      </div>
      {selectedDate && <WeekDays startDate={currentDate} />}
    </div>
  );
};



const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '24px',
    marginBottom: '15px',
    textAlign: 'center', 
  },
  calendarContain: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  calendar: {
    width: '450px',
    height: '500px',
  },
};


export default CalendarDisplay;
