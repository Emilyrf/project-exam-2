import { useEffect, useState } from 'react';
import { useStore } from '../../stores/useStore';
import { useNavigate, Link } from 'react-router-dom';
import { fetchUserVenues, fetchBookings } from '../../services/api/api';
import UserProfile from '../../components/Profile/UserProfile';
import UpcomingBookings from '../../components/Bookings/UpcomingBookings';
import UsersVenues from '../../components/Venues/UsersVenues';
import { Loading } from '../../components/Loading';

export default function DashboardPage() {
  const token = useStore((state) => state.token);
  const user = useStore((state) => state.user);
  const defaultAvatar = '/assets/holidaze-avatar.png';
  const setVenues = useStore((state) => state.setVenues);
  const setBookings = useStore((state) => state.setBookings);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
  
    // If the user is a venue manager, fetch both venues and bookings
    if (user && user.venueManager) {
      Promise.all([
        fetchUserVenues(token, user),
        fetchBookings(token, user)
      ])
      .then(([venuesRes, bookingsRes]) => {
        setVenues(venuesRes.data);
        setBookings(bookingsRes.data);
        setIsLoading(false); // Set loading to false when data is fetched
      })
      .catch(error => {
        console.error('Error fetching venues and bookings:', error);
        setIsLoading(false); // Set loading to false on error
      });
    } else { // If the user is not a venue manager, fetch only bookings
      fetchBookings(token, user)
        .then(bookingsRes => {
          setBookings(bookingsRes.data);
          setIsLoading(false); // Set loading to false when data is fetched
        })
        .catch(error => {
          console.error('Error fetching bookings:', error);
          setIsLoading(false); // Set loading to false on error
        });
    }
  }, [token, user, setVenues, setBookings, navigate]);
  
  if (!token) {
    return false;
  }

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <UserProfile
        user={user}
        defaultAvatar={defaultAvatar}
        onEditAvatarClick={() => document.getElementById('update_avatar_modal').showModal()}
      />
      {!user.venueManager ? (
     
       <UpcomingBookings />
      
      ) : (
        <>
        <UsersVenues />
        <UpcomingBookings />
        </>
      )}
    </>
  );
}
