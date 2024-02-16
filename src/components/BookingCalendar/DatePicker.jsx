import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const CustomDatePicker = ({ bookedDates, onSelectDate }) => {
  const pastMonth = new Date();
  const [range, setRange] = useState();

  let disabledDays = [];
  if (bookedDates) {
    disabledDays = bookedDates.map((booking) => ({
      from: new Date(booking.start),
      to: new Date(booking.end),
    }));
  }

  let footer = <p>Please pick the first day.</p>;
  if (range?.from) {
    if (!range.to) {
      footer = <p>{range.from.toLocaleDateString()}</p>;
    } else if (range.to) {
      footer = (
        <p>
          {range.from.toLocaleDateString()} – {range.to.toLocaleDateString()}
        </p>
      );
    }
  }

  const handleDateChange = (selectedRange) => {
    setRange(selectedRange);
    if (typeof onSelectDate === 'function') {
      onSelectDate(selectedRange); // Pass the selected date range to the parent component
    }
  };

  return (
    <DayPicker
      mode="range"
      defaultMonth={pastMonth}
      selected={range}
      footer={footer}
      onSelect={handleDateChange}
      disabled={disabledDays}
    />
  );
};

export default CustomDatePicker;
