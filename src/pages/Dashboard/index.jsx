import { useEffect } from 'react';
import { useStore } from '../../stores/useStore';
import { useNavigate, Link } from 'react-router-dom';
import { fetchUserVenues, fetchBookings } from '../../services/api/api';
import UpdateProfileForm from '../../components/Profile/UpdateAvatarForm';
import UpcomingBookings from '../../components/Bookings/UpcomingBookings';
import UsersVenues from '../../components/Venues/UsersVenues';

export default function DashboardPage() {
  const token = useStore((state) => state.token);
  const user = useStore((state) => state.user);
  const defaultAvatar = '/assets/holidaze-avatar.png';
  const setVenues = useStore((state) => state.setVenues);
  const setBookings = useStore((state) => state.setBookings);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    if (user && user.venueManager) {
      fetchUserVenues(token, user)
        .then((res) => {
          setVenues(res.data);
        })
        .catch((error) => {
          console.error('Error fetching venues:', error);
        });
    } else {
      fetchBookings(token, user)
        .then((res) => {
          setBookings(res.data);
        })
        .catch((error) => {
          console.error('Error fetching bookings:', error);
        });
    }
  }, [token, user, setVenues, setBookings, navigate]);

  if (!token) {
    return false;
  }

  return (
    <>
      <div className='hero bg-base-100 shadow-xl'>
        <div className='hero-content flex-col lg:flex-row m-4'>
          <img
            src={user.avatar || defaultAvatar}
            alt={user.name}
            className='rounded-full object-cover w-72 h-72'
          />
          <div className='mt-4 text-center'>
            <h1 className='lg:text-5xl text-2xl font-bold text-secondary p-4'>
              Welcome, {user ? user.name : 'Guest'}
            </h1>
            <h2>Email: {user.email}</h2>
            <div className='mt-4 text'>
              <button
                className='btn btn-primary text-xl'
                onClick={() => document.getElementById('update_avatar_modal').showModal()}
              >
                Edit avatar
              </button>
              <UpdateProfileForm />
            </div>
          </div>
        </div>
      </div>
      {user && user.venueManager ? (
        <section className='mx-5'>
          <h2 className='text-3xl font-bold text-secondary m-5 text-center'>Your venues:</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-8'>
            <UsersVenues />
          </div>
          <div className='text-center'>
            <Link to={`/create`}>
              <button className='btn btn-primary text-xl m-4 '>Create Venue</button>
            </Link>
          </div>
        </section>
      ) : (
        <section className='mx-5'>
          <h2 className='text-3xl font-bold text-secondary m-5 text-center'>Upcoming bookings:</h2>
          <UpcomingBookings />
        </section>
      )}
    </>
  );
}
