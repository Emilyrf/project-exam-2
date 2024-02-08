import DeleteBookingForm from '../forms/DeleteBookingForm';

const UpcomingBookings = () => {
  return (
    <div>
      <div className='card card-side mx-5'>
        <figure>
          <img className='w-24 rounded' src='/public/assets/temporaria.jpeg' alt='Venue' />
        </figure>
        <div className='card-body'>
          <h2 className='card-title'>House in the forest</h2>

          <div className='card-actions justify-end'>
            <p>18 Feb 2024 - 21 Feb 2024</p>
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
            <DeleteBookingForm />
          </div>
        </div>
      </div>
      <hr className='border-t-4' />
    </div>
  );
};

export default UpcomingBookings;
