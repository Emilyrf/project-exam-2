import React from 'react';

const GuestsInput = ({ numGuests, setNumGuests }) => {
  return (
    <div>
      <label htmlFor='numGuests' className='mr-2'>Number of guests:</label>
      <input
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
