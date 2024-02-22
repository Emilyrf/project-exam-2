import { useState } from 'react';
import { useStore } from '../../stores/useStore';
import DeleteVenueForm from './DeleteVenueForm';
import ViewBookingsForm from '../Bookings/ViewBookingsForm';
import { Link } from 'react-router-dom';
import AlertInfo from '../Alerts/info';

const UsersVenues = () => {
  const [venues, setVenues] = useState(useStore((state) => state.venues));
  const defaultImage = '/assets/holidaze-venue.jpeg';

  const handleDeleteSuccess = (deletedVenueId) => {
    setVenues(venues.filter((venue) => venue.id !== deletedVenueId));
  };
  const handleDeleteError = (errorMessage) => {
    console.error('Error deleting venue:', errorMessage);
  };

  if (venues.length === 0) {
    return <AlertInfo message={'You haven`t posted any venues yet'} />;
  }

  return (
    <section className='mx-5'>
      <h2 className='text-3xl font-bold text-secondary m-5 text-center'>Your venues:</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-8'>
        {venues.map((venue) => (
          <div key={venue.id} className='card bg-base-100 shadow-xl card-compact relative'>
            <Link to={`/venue/${venue.id}`}>
              <figure className='px-5 pt-5 relative overflow-hidden'>
                <img
                  src={venue.media.length > 0 ? venue.media[0] : defaultImage}
                  alt={venue.name}
                  className='rounded-xl object-cover h-64 w-full'
                />
              </figure>

            </Link>
            <div className='card-body items-center text-center'>
              <h2 className='card-title'>{venue.name}</h2>
              <button
                className='btn'
                onClick={() => document.getElementById('view_bookings').showModal()}
              >
                View bookings
              </button>
              <ViewBookingsForm venue={venue} />
              <div className='card-actions justify-end'>
                <Link to={`/edit/${venue.id}`}>
                  <button className='btn'>
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
                        d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                      />
                    </svg>
                  </button>
                </Link>
                <button
                  className='btn'
                  onClick={() =>
                    document.querySelector(`[data-id="${venue.id}"][id=delete_venue]`).showModal()
                  }
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
                <DeleteVenueForm
                  id={venue.id}
                  name={venue.name}
                  onDeleteSuccess={() => handleDeleteSuccess(venue.id)}
                  onDeleteError={handleDeleteError}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='text-center'>
        <Link to={`/create`}>
          <button className='btn btn-primary text-xl m-4 '>Create Venue</button>
        </Link>
      </div>
    </section>
  );
};

export default UsersVenues;
