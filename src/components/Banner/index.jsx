export default function Banner() {
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
          <label className='form-control w-full max-w-xs'>
            <div className='label'>
              <span className='text'>Where do you wann go?</span>
            </div>
            <input
              type='text'
              placeholder='Type here'
              className='input input-bordered w-full max-w-xs'
            />
          </label>
        </div>
      </div>
    </div>
  );
}
