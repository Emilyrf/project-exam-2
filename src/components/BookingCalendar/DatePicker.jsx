import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomDatePicker = ({ selected, onChange, minDate, startDate, endDate, bookedDates }) => {

  //DIAS JA BOOKADOS ??????
  const dayClassName = (date) => {
    if (bookedDates && bookedDates.length > 0) {
      const isBookedDay = bookedDates.some(booking =>
        new Date(booking.dateFrom) <= date && date <= new Date(booking.dateTo)
      );
      return isBookedDay ? 'booked-day' : '';
    } else {
      return '';
    }
  };
  
  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      minDate={minDate}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      inline
      showDisabledMonthNavigation
      dayClassName={dayClassName} 
    />
  );
};

export default CustomDatePicker;
