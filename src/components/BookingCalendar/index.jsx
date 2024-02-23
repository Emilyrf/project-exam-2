import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../../stores/useStore';
import DayPicker from './DatePicker';
import GuestInput from './GuestsInput';
import { createBooking } from '../../services/api/api';
import AlertError from '../Alerts/error';
import AlertSuccess from '../Alerts/success';
import AlertInfo from '../Alerts/info';

const BookingCalendar = ({ bookedDates, token, user }) => {
  const setSelectedDateRange = useStore((state) => state.setSelectedDateRange);
  const selectedDateRange = useStore((state) => state.selectedDateRange);
  const [numGuests, setNumGuests] = useState(1);
  const { id: venueId } = useParams();
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleDateSelection = (selectedRange) => {
    setSelectedDateRange(selectedRange);
  };

  const handleBooking = async () => {
    const { from: startDate, to: endDate } = selectedDateRange || {};

    try {
      if (!venueId) {
        console.error('Venue ID is not available in the URL');
        return;
      }

      if (!startDate || !endDate) {
        setErrorMessage('Please select a date range.');
        return;
      }

      const currentDate = new Date();
      if (startDate < currentDate || endDate < currentDate) {
        setErrorMessage('Please select future dates for booking.');
        return;
      }

      await createBooking(
        {
          dateFrom: startDate.toISOString(),
          dateTo: endDate.toISOString(),
          guests: numGuests,
          venueId: venueId,
        },
        token,
      );
      setSuccessMessage('Booking successful!');
      setErrorMessage('');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessage = error.response.data.errors[0].message;
        setErrorMessage(errorMessage);
      } else {
        setErrorMessage('An error occurred while processing your booking.');
      }
      setSuccessMessage('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className='text-lg font-semibold text-secondary'>Select a Date: </h3>

      {errorMessage && <AlertError errorMessage={errorMessage} />}
      {successMessage && <AlertSuccess message={successMessage} />}
      
      <DayPicker onSelect={handleDateSelection} bookedDates={bookedDates} />

      {(!token) ? (
      
          <AlertInfo message={'Login as a customer to be able to book a stay in this venue.'} />
 
      ) : (
        <div>
            <GuestInput numGuests={numGuests} setNumGuests={setNumGuests} />
          <button className='btn text-xl btn-primary mt-3' onClick={handleBooking}>
            Book Now
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingCalendar;