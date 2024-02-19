import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../../stores/useStore';
import DayPicker from './DatePicker';
import GuestInput from './GuestsInput';
import { createBooking } from '../../services/api/api';
import AlertError from '../Alerts/error';
import AlertSuccess from '../Alerts/success';

const BookingCalendar = ({ bookedDates }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const token = useStore((state) => state.token);
  const [numGuests, setNumGuests] = useState(1);
  const { id: venueId } = useParams();
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleDateSelection = (selectedRange) => {
    if (selectedRange) {
      setStartDate(selectedRange.from);
      setEndDate(selectedRange.to);
    } else {
      setStartDate(null);
      setEndDate(null);
    }
  }

  const handleBooking = async () => {
    console.log('Booking button clicked');
    console.log('Start date:', startDate);
    console.log('End date:', endDate);

    try {
      if (!venueId) {
        console.error('Venue ID is not available in the URL');
        return;
      }

      if (!startDate || !endDate) {
        setErrorMessage('Please select a date range.');
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

      <DayPicker onSelect={handleDateSelection} bookedDates={bookedDates} />

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
