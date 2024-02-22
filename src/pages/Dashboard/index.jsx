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

    if (user && user.venueManager) {
      fetchUserVenues(token, user)
        .then((res) => {
          setVenues(res.data);
          setIsLoading(false); // Set loading to false when data is fetched
        })
        .catch((error) => {
          console.error('Error fetching venues:', error);
          setIsLoading(false); // Set loading to false on error
        });
    } else {
      fetchBookings(token, user)
        .then((res) => {
          setBookings(res.data);
          setIsLoading(false); // Set loading to false when data is fetched
        })
        .catch((error) => {
          console.error('Error fetching bookings:', error);
          setIsLoading(false); // Set loading to false on error
        });
    }
  }, [token, user, setVenues, setBookings, navigate]);

  if (!token) {
    return false;
  }

  if (isLoading) {
    return <Loading />; // Render loading spinner while data is being fetched
  }
  return (
    <>
      <UserProfile
        user={user}
        defaultAvatar={defaultAvatar}
        onEditAvatarClick={() => document.getElementById('update_avatar_modal').showModal()}
      />
      {user && user.venueManager ? (
        <UsersVenues />
      ) : (
        <UpcomingBookings />
      )}
    </>
  );
}
