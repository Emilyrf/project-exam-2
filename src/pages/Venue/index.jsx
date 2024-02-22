import { useParams } from 'react-router-dom';
import { useStore } from '../../stores/useStore';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '../../components/Loading';
import { fetchSingleVenue } from '../../services/api/api';
import VenueDetails from '../../components/Venues/VenueDetails';

const VenuePage = () => {
  const defaultImage = '/assets/holidaze-venue.jpeg';
  const { id } = useParams();
  const {
    data: venue,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['singleVenue', id],
    queryFn: () => fetchSingleVenue(id),
  });
  const user = useStore((state) => state.user);
  const token = useStore((state) => state.token);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='max-w-screen-xl p-4 m-auto'>
      <h1 className='lg:text-3xl text-xl font-bold mb-4 text-secondary'>{venue.name}</h1>
      <VenueDetails
      venue={venue}
      defaultImage={defaultImage}
      token={token}
      user={user}
    /> 
    </div>
  );
};

export default VenuePage;

