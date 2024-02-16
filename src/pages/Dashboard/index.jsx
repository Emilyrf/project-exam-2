import { useEffect } from 'react';
import { useStore } from '../../stores/useStore';
import { useNavigate , Link } from 'react-router-dom';
import { fetchUserVenues, fetchBookings } from '../../services/api/http';
import UpdateProfileForm from './forms/UpdateAvatarForm';
import UpcomingBookings from './components/UpcomingBookings';
import UsersVenues from './components/UsersVenues';

export default function DashboardPage() {
  const token = useStore((state) => state.token);
  const user = useStore((state) => state.user);
  const setVenues = useStore((state) => state.setVenues);
  const setBookings = useStore((state) => state.setBookings);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (user && user.venueManager) {
      fetchUserVenues(token, user)
        .then((res) => {
          setVenues(res.data);
        })
        .catch((error) => {
          console.error("Error fetching venues:", error);
        });
    } else {
      fetchBookings(token, user)
        .then((res) => {
          setBookings(res.data);
        })
        .catch((error) => {
          console.error("Error fetching bookings:", error);
        });
    }
  }, [token, user, setVenues, setBookings, navigate]);

  if (!token) {
    return false;
  }

  return (
    <>
       <div className="hero bg-base-100 shadow-xl">
         <div className="hero-content flex-col lg:flex-row m-4">
           {/* Image */}
           <img src={user.avatar} alt='User Avatar' className='rounded-full w-96 h-96 mr-8' />

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

      {user && user.venueManager ? (
        <section className='mx-5'>
          <h2 className='text-3xl font-bold text-secondary m-5 text-center'>Your venues:</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-8 '>
            <UsersVenues />
          </div>
          <div className="text-center">
           <Link to={`/create`}>
             <button className="btn btn-accent">Create Venue</button>
           </Link>
         </div>
        </section>
      ) : (
        <section className='mx-5'>
          <h2 className='text-3xl font-bold text-secondary m-5 text-center'>Upcoming bookings:</h2>
          <UpcomingBookings />
        </section>
      )}
   
  ); 
    </>
  );
}