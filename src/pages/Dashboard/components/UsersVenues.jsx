import DeleteVenueForm from '../forms/DeleteVenueForm';

const UsersVenues = () => {
  return (
    <div>
      <div className='card  bg-base-100 shadow-xl card-compact relative'>
        <figure className='px-10 pt-10'>
          <img src='/public/assets/temporaria.jpeg' alt='Shoes' className='rounded-xl' />
        </figure>
        <div className='card-body items-center text-center'>
          <h2 className='card-title'>House in the forest</h2>
          <p>View bookings.</p>
          <div className='card-actions justify-end'>
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
            <button
              className='btn'
              onClick={() => document.getElementById('delete_venue').showModal()}
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
            <DeleteVenueForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersVenues;
