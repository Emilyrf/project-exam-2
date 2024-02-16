import VenueFilter from '../Venues/VenueFilter';
import { useQuery } from '@tanstack/react-query';
import { fetchVenues } from '../../services/api/http';

export default function Banner() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['repoData'],
    queryFn: fetchVenues,
  });
  return (
    <div
      className='hero min-h-screen'
      style={{
        backgroundImage: 'url(/assets/temporaria.jpeg)',
        alt: 'Checkout success image',
      }}
    >
      <div className='hero-overlay bg-opacity-60'></div>
      <div className='hero-content text-center text-neutral-content'>
        <div className='max-w-md'>
          <h1 className='mb-5 text-5xl font-bold'>Holidaze</h1>
          <p className='mb-5'>Feel at home, anywhere</p>
          <VenueFilter venues={data} />
        </div>
      </div>
    </div>
  );
}
