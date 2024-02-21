import DateFormatter from '../../utils/DateFormatter';

const ViewBookingsForm = ({ venue }) => {
  return (
    <dialog id='view_bookings' className='modal'>
      <div className='modal-box'>
        <form method='dialog'>
          <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</button>
        </form>
        <h3 className='font-bold text-lg'>{venue.name}</h3>
        {venue.bookings && venue.bookings.length > 0 ? (
          <ul>
            {' '}
            Bookings:
            {venue.bookings.map((booking, index) => (
              <li key={index}>
                {' '}
                <DateFormatter date={booking.dateFrom} /> - <DateFormatter date={booking.dateTo} />
              </li>
            ))}
          </ul>
        ) : (
          <p>This venue has no bookings yet.</p>
        )}
      </div>
    </dialog>
  );
};

export default ViewBookingsForm;
