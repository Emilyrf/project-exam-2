import React from 'react';

const GuestsInput = ({ numGuests, setNumGuests }) => {
  return (
<div>
  <label htmlFor='numGuests' className='mr-2 font-bold`'>Number of guests:</label>
  <input
 className="input input-bordered w-28"
    type='number'
    id='numGuests'
    value={numGuests}
    onChange={(e) => setNumGuests(parseInt(e.target.value))}
    min={1}
  />
</div>
  );
};

export default GuestsInput;
