import { useState } from 'react';
import { Link } from 'react-router-dom';

function VenueFilter({ venues = [] }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filtervenues = venues.filter((venue) =>
    venue.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className='relative w-full mx-auto p-4 max-w-xs'>
      <label className='text-2xl'>Where do you wanna go?</label>
      <input
        className='input input-bordered w-full max-w-xs px-4 py-2 mt-3 text-xl text-secondary-content'
        type='text'
        placeholder='Type here'
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value.trim())}
      />
      {filtervenues.length > 0 && searchTerm.length > 0 && (
        <ul className='absolute left-5 right-5 z-30 bg-base-100 text-secondary-content'>
          {filtervenues.map((venue) => {
            return (
              <li key={venue.id}>
                <Link to={`/venue/${venue.id}`} className='block p-4 hover:bg-accent'>
                  {venue.name}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default VenueFilter;
