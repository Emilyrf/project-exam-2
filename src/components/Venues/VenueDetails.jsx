import CurrencyFormatter from '../../utils/CurrencyFormatter';
import BookingCalendar from '../BookingCalendar'; 

const VenueDetails = ({ venue, defaultImage, token, user }) => {
    const bookedDates = venue.bookings.map((booking) => ({
      start: new Date(booking.dateFrom),
      end: new Date(booking.dateTo),
    }));
  
    return (
        <>
          <h3 className='text-neutral-500'>
            {venue.location.city
              ? `${venue.location.city}, ${venue.location.country || 'Planet Earth'}`
              : `Somewhere, ${venue.location.country || 'Planet Earth'}`}
          </h3>
          <div className='w-full overflow-hidden rounded-xl mt-4'>
            <img
              className='object-cover w-full max-h-96'
              src={venue.media.length > 0 ? venue.media[0] : defaultImage}
              alt={venue.name}
            />
          </div>
          <div className='flex flex-col md:flex-row items-center mt-4'>
            <h2 className='text-xl font-semibold mr-2 '>Hosted by {venue.owner.name}</h2>
            <div className='w-10 h-10 rounded-full overflow-hidden'>
              <img
                src={venue.owner.avatar}
                alt={venue.owner.name}
                className='object-cover w-full h-full'
              />
            </div>
          </div>
          <div className='flex flex-col md:flex-row m-4 '>
            <div className='md:w-1/2'>
              <h3 className='text-lg font-semibold mt-4 text-secondary'>About the venue: </h3>
              <p className='text-gray-600'>{venue.description}</p>
              <h3 className='text-lg font-semibold mt-4 text-secondary'>Number of Guests: </h3>
              <p>{venue.maxGuests} guests</p>
              <h3 className='text-lg font-semibold mt-4 text-secondary'>What this place offers:</h3>
              <ul className='list-disc'>
                {Object.entries(venue.meta).map(([key, value]) => (
                  <li key={key} className='text-gray-600 flex items-center'>
                    {key}
                    {value ? (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                        className='h-5 w-5 ml-2 text-green-500'
                      >
                        <path
                          fillRule='evenodd'
                          d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z'
                          clipRule='evenodd'
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                        className='h-5 w-5 ml-2 text-red-500'
                      >
                        <path
                          fillRule='evenodd'
                          d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z'
                          clipRule='evenodd'
                        />
                      </svg>
                    )}
                  </li>
                ))}
              </ul>
    
              <h3 className='text-lg font-semibold mt-4 text-secondary'>Price:</h3>
              <p>
                <CurrencyFormatter amount={venue.price} /> per night
              </p>
            </div>
            <div className='md:w-1/2 m-4 flex justify-center text-center'>
              <div>
                <BookingCalendar bookedDates={bookedDates} token={token} user={user} />
              </div>
            </div>
          </div>
        </>
      );
    };
    
    export default VenueDetails;
