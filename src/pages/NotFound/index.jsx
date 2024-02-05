import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className='hero min-h-screen  bg-base-200'>
      <div className='max-w-5xl mx-auto hero-content flex-col gap-12 lg:flex-row-reverse items-center justify-center'>
        <img src='/public/assets/temporaria.jpeg' alt='Dog wearing glasses.' />
        <div className='text-center '>
          <h1 className='text-5xl font-bold my-2'>Page not found!</h1>
          <p className='my-2 text-gray-800'>
            Looks like the page you are looking for doesn't exist. Sorry about that!
          </p>
          <button className='w-full my-2 btn btn-primary' onClick={() => navigate(-1)}>
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}
