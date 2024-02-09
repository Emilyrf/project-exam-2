import { useState } from 'react';
import { useStore } from '../../../stores/useStore';
import DeleteBookingForm from '../forms/DeleteBookingForm';
import { Link } from 'react-router-dom';


function formatDate(date) {
  return new Date(date).toLocaleDateString('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

const UpcomingBookings = () => {
  const [bookings, setBookings] = useState(useStore((state) => state.bookings)); 
  const defaultImage = '/assets/temporaria.jpeg';

  const handleDeleteSuccess = (deletedBookingId) => {
    setBookings(bookings.filter((booking) => booking.id !== deletedBookingId));
  };

  const handleDeleteError = (errorMessage) => {
    console.error('Error deleting booking:', errorMessage);
  };

  return (
    <div>
      {bookings.map((booking) => (
        <div key={booking.id} className='card card-side mx-5 flex items-center'>
          <Link to={`/venue/${booking.id}`}>
            <figure className='h-32 w-32 rounded'>
              <img
                src={booking.venue.media.length > 0 ? booking.venue.media[0] : defaultImage}
                alt={booking.description}
                className='rounded-xl'
              />
            </figure>
          </Link>
          <div className='card-body flex-grow ml-4'>
            <h2 className='card-title'>
              {booking.venue.name}
            </h2>

            <div className='flex justify-between items-center'>
              <p>
                {formatDate(booking.dateFrom)} - {formatDate(booking.dateTo)}
              </p>

              <button
                className='btn'
                onClick={() => document.getElementById('delete_booking').showModal()}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                  />
                </svg>
              </button>
              <DeleteBookingForm 
                id={booking.id} 
                onDeleteSuccess={() => handleDeleteSuccess(booking.id)} 
                onDeleteError={handleDeleteError} 
              />
            </div>
            <hr className='border-t-4' />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingBookings;
