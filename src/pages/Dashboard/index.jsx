import { useUser } from '../../stores/useUserStore';
import UpdateProfileForm from './forms/UpdateAvatarForm';
import UpcomingBookings from './components/UpcomingBookings';
import UsersVenues from './components/UsersVenues';

const DashboardPage = () => {
  const user = useUser();
  console.log(user);

  if (!user) {
    return (
      <div className='max-w-screen-xl mx-auto p-4 mt-8 md:mt-12 lg:mt-16'>
        <p>User not logged in</p>
      </div>
    );
  }

  var section = '';
  if (user.venueManager) {
    section = (
      <section className='mx-5'>
        <h2 className='text-3xl font-bold text-secondary m-5 text-center'>Your venues:</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-8 '>
          <UsersVenues />
          <UsersVenues />
          <UsersVenues />
        </div>
      </section>
    );
  } else {
    section = (
      <section className='mx-5'>
        <h2 className='text-3xl font-bold text-secondary m-5 text-center'>Upcoming bookings:</h2>
        <UpcomingBookings />
        <UpcomingBookings />
        <UpcomingBookings />
      </section>
    );
  }

  return (
    <>
      <div className="hero bg-base-100 shadow-xl">
        <div className="hero-content flex-col lg:flex-row m-4">
          {/* Image */}
          <img src={user.avatar} alt='User Avatar' className='rounded-full w-96 h-96 mr-8 ' />

          {/* Text */}
          <div className="mt-4 text-center">
            <h1 className="text-5xl font-bold text-secondary p-4">Welcome, {user ? user.name : 'Guest'}</h1>
            <h2>Email: {user.email}</h2>
            <div className="mt-4 text">
              <button
                className='btn btn-primary'
                onClick={() => document.getElementById('update_avatar_modal').showModal()}
              >
                Edit avatar
              </button>
              <UpdateProfileForm />
            </div>
          </div>
        </div>
      </div>

      {/* 
      <div className='card lg:card-side bg-base-100 shadow-xl p-10 justify-evenly'>
        <div className='card-body justify-center'>
          <figure>
            <img src={user.avatar} alt='User Avatar'
              className='rounded-full w-96 h-96' />
          </figure>
        </div>
        <div className='card-body'>
          <h1 className='text-5xl font-bold text-secondary'>Welcome, {user ? user.name : 'Guest'}</h1>
          <h2>Email: {user.email}</h2>
          <div className="mt-4">
            <button
              className='btn btn-primary'
              onClick={() => document.getElementById('update_avatar_modal').showModal()}
            >
              Edit avatar
            </button>
            <UpdateProfileForm />
          </div>
        </div>
      </div> */}
      {section}
    </>
  );
};

export default DashboardPage;
