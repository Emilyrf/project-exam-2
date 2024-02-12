import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../../stores/useStore';
import DatePicker from './DatePicker';
import GuestInput from './GuestsInput';
import { isWithinInterval } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { createBooking } from '../../services/api/http';
import AlertError from '../Alerts/error';
import AlertSuccess from '../Alerts/success';

const BookingCalendar = ({ onSelectDate, onBookNowClick, bookedDates }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const token = useStore((state) => state.token);
  const [numGuests, setNumGuests] = useState(1);
  const { id: venueId } = useParams();
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const isBookedDay = (date) => {
    return bookedDates.some((booking) =>
      isWithinInterval(date, { start: new Date(booking.dateFrom), end: new Date(booking.dateTo) })
    );
  };

  //DIAS JA BOOKADOS ??????
  const dayClassName = (date) => {
    return isBookedDay(date) ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : '';
  };


  const handleBooking = async () => {
    try {
      if (!venueId) {
        console.error('Venue ID is not available in the URL');
        return;
      }

      await createBooking({
        dateFrom: startDate.toISOString(),
        dateTo: endDate.toISOString(),
        guests: numGuests,
        venueId: venueId
      }, token);

      console.log('Booking successful!');
      setSuccessMessage('Booking successful!');

      if (typeof onBookNowClick === 'function') {
        onBookNowClick(startDate);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessage = error.response.data.errors[0].message;
        setErrorMessage(errorMessage);
      } else {
        setErrorMessage('An error occurred while processing your booking.');
      }
    }
  };

  return (
    <div className='text-center ml-auto'>
      <h3 className='text-lg font-semibold text-secondary'>Select a Date: </h3>

      {errorMessage && <AlertError errorMessage={errorMessage} />}
      {successMessage && <AlertSuccess successMessage={successMessage} />}

      <DatePicker
        selected={startDate}
        onChange={onChange}
        minDate={new Date()}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        showDisabledMonthNavigation
        dayClassName={dayClassName}
      />
      <div className='mt-3'>
        <GuestInput
          numGuests={numGuests}
          setNumGuests={setNumGuests}
        />
      </div>
      <div>
        <button className='btn btn-primary mt-3' onClick={handleBooking}>
          Book Now
        </button>
      </div>
    </div>
  );
};

export default BookingCalendar;
