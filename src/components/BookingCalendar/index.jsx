import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { isWithinInterval, addMonths } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

// ... (other imports)

const BookingCalendar = ({ onSelectDate, onBookNowClick, bookedDates }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const isBookedDay = (date) => {
    const result = bookedDates.some((booking) =>
      isWithinInterval(date, { start: new Date(booking.start), end: new Date(booking.end) })
    );
    return result;
  };
  
  

  const dayClassName = (date) => {
    return isBookedDay(date) ? 'bg-gray-200' : ''; // Tailwind classes for styling booked dates
  };

  const handleBookNowClick = () => {
    // Perform actions when the "Book Now" button is clicked
    console.log('Book Now button clicked!');
    console.log('Selected date:', startDate);
  };

  return (
    <div className='text-center ml-auto'>
      <h3 className='text-lg font-semibold text-secondary'>Select a Date: </h3>
      <DatePicker
        selected={startDate}
        onChange={onChange}
        minDate={new Date()}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        showDisabledMonthNavigation
        dayClassName={dayClassName} // Apply custom class for booked dates
      />
      <div>
        <button className='btn btn-primary mt-3' onClick={handleBookNowClick}>
          Book Now
        </button>
      </div>
    </div>
  );
};

export default BookingCalendar;
