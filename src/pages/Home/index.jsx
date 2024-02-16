import { useQuery } from '@tanstack/react-query';
import Banner from '../../components/Banner';
import VenuesList from '../../components/Venues/VenueList';
import { fetchVenues } from '../../services/api/http';


export default function Homepage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['fetchVenues'],
    queryFn: fetchVenues,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Banner />
      <h1 className='text-3xl font-bold text-secondary m-5 text-center'>
        Check out this amazing destinations:
      </h1>
      <VenuesList venues={data} />
    </div>
  );
}