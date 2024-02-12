import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchSingleVenue } from '../../services/api/api';
import BookingCalendar from '../../components/BookingCalendar';

const VenuePage = () => {
  const defaultImage = '/assets/temporaria.jpeg';
  const { id } = useParams();
  const {
    data: venue,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['singleVenue', id],
    queryFn: () => fetchSingleVenue(id),
  });
  console.log('Data from API:', venue);

  const handleDateSelection = (date) => {
    console.log('Selected date:', date);
  };

  const handleBooking = (selectedDate) => {
    // Perform actions related to booking
    console.log('Booking action for date:', selectedDate);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Extracting booked dates from the venue object
  const bookedDates = venue.bookings.map((booking) => ({
    start: new Date(booking.dateFrom),
    end: new Date(booking.dateTo),
  }));

  return (
    <div>
      {venue ? (
        <div className='max-w-screen-xl mx-auto p-4 mt-8 md:mt-12 lg:mt-16'>
          <h1 className='text-3xl font-bold mb-4 text-secondary'>{venue.name}</h1>
          <h3 className='text-neutral-500'>
            {venue.location.city
              ? `${venue.location.city}, ${venue.location.country || 'Planet Earth'}`
              : `Somewhere, ${venue.location.country || 'Planet Earth'}`}
          </h3>
          <div className='w-full overflow-hidden rounded-xl mt-4'>
            <img
              className='object-cover w-full h-64 md:h-96 lg:h-80'
              src={venue.media.length > 0 ? venue.media[0] : defaultImage}
              alt={venue.name}
            />
          </div>
          <div className='flex items-center mt-4'>
            <h2 className='text-xl font-semibold mr-2 text-secondary'>
              Hosted by {venue.owner.name}
            </h2>
            <div className='w-10 h-10 rounded-full overflow-hidden'>
              <img
                src={venue.owner.avatar}
                alt={venue.owner.name}
                className='object-cover w-full h-full'
              />
            </div>
          </div>
          <div className='flex'>
            <div>
              <p className='mt-2 text-gray-600'>{venue.description}</p>
              <h3 className='text-lg font-semibold mt-4 text-secondary'>Max Guests </h3>
              <p>{venue.maxGuests}</p>
              <h3 className='text-lg font-semibold mt-4 text-secondary'>Included </h3>
              <ul className='list-disc ml-6'>
                {Object.entries(venue.meta).map(([key, value]) => (
                  <li key={key} className='text-gray-600'>
                    {key}: {value.toString()}
                  </li>
                ))}
              </ul>
            </div>
            <BookingCalendar
              onSelectDate={handleDateSelection}
              onBookNowClick={handleBooking}
                //DIAS JA BOOKADOS ??????
              bookedDates={bookedDates} 
            />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default VenuePage;
