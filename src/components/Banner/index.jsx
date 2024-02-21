import VenueFilter from '../Venues/VenueFilter';
import { useQuery } from '@tanstack/react-query';
import { fetchVenues } from '../../services/api/api';

export default function Banner() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['repoData'],
    queryFn: fetchVenues,
  });
  return (
    <div
      className='hero min-h-screen'
      style={{
        backgroundImage: 'url(/assets/holidaze-venue.jpeg)',
        alt: 'Checkout success image',
      }}
    >
      <div className='hero-overlay bg-opacity-40'></div>
      <div className='hero-content text-center text-neutral-content '>
        <div className='max-w-md'>
          <h1 className='mb-2 text-7xl font-bold lg:text-8xl'>Holidaze</h1>
          <p className='mb-5 text-xl '>Feel at home, anywhere</p>
          <VenueFilter venues={data} />
        </div>
      </div>
    </div>
  );
}
