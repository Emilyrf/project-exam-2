import { Link } from 'react-router-dom';
import CurrencyFormatter from '../../utils/CurrencyFormatter';

export default function VenueCard({ venue }) {
  const defaultImage = '/assets/temporaria.jpeg';

  return (
    <div className='card glass card-compact shadow-xl  relative'>
      <div className='badge badge-accent absolute top-2 right-2'>
        {venue.location.country || 'Planet Earth'}
      </div>

      <figure>
        <img
          className='w-full h-64 object-cover'
          src={venue.media.length > 0 ? venue.media[0] : defaultImage}
          alt={venue.name}
        />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>{venue.name}</h2>
        <p>{venue.description.slice(0, 40)}...</p>
        <CurrencyFormatter amount={venue.price} />
        <div className='card-actions justify-end'>
          <Link to={`/venue/${venue.id}`}>
            <button className='btn btn-primary'>Check it out!</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
