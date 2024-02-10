import React from 'react';
import data from '../JSON/Events.json';

const TimePart = ({ date, rows }) => {
    const generateTimeLabels = (startHour, endHour) => {
        const timeLabels = [];
        for (let hour = startHour; hour <= endHour; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const displayHour = hour <= 12 ? hour : hour - 12;
                const amPm = hour < 12 ? 'AM' : 'PM';
                timeLabels.push({
                    id: `${date.toISOString()}-${hour}-${minute}`,
                    label: `${displayHour}:${minute === 0 ? '00' : minute} ${amPm}`,
                });
            }
        }
        return timeLabels;
    };

    const hourLabels = generateTimeLabels(8, 23);

    const columnsPerRow = 3;
    const rowsCount = Math.ceil(hourLabels.length / columnsPerRow);

    const getRowIndex = (index) => Math.floor(index / columnsPerRow);
    const getColumnIndex = (index) => index % columnsPerRow;

    return (
        <div className="time-part">
            {Array.from({ length: rowsCount }, (_, rowIndex) => (
                <div className="time-row" key={`row-${rowIndex}`}>
                    {hourLabels.slice(rowIndex * columnsPerRow, (rowIndex + 1) * columnsPerRow).map((timeLabel, index) => {
                        const eventId = `${date.toISOString()}-${timeLabel.label}`;
                        const event = data.find((event) => event.Id === eventId);

                        return (
                            <div className="time-interval" key={timeLabel.id}>
                                <p className="hour-label">{timeLabel.label}</p>
                                <input
                                    type="checkbox"
                                    id={timeLabel.id}
                                    className="checkbox"
                                    checked={event}

                                />
                                <label htmlFor={timeLabel.id} className="checkbox-label"></label>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default TimePart;
