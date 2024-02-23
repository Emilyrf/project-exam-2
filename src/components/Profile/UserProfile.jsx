import UpdateAvatarForm from './UpdateAvatarForm'

function UserProfile({ user, defaultAvatar, onEditAvatarClick }) {
  return (
    <div className='hero bg-base-100 shadow-xl'>
      <div className='hero-content flex-col lg:flex-row m-4'>
        <img
          src={user.avatar || defaultAvatar}
          alt={user.name}
          className='rounded-full object-cover w-72 h-72'
        />
        <div className='mt-4 text-center'>
          <h1 className='lg:text-5xl text-2xl font-bold text-secondary p-4'>
            Welcome, {user ? user.name : 'Guest'}
          </h1>
          <h2>Email: {user.email}</h2>
          <div className='mt-4 text'>
            <button
              className='btn btn-primary text-xl'
              onClick={onEditAvatarClick}
            >
              Edit avatar
            </button>
            <UpdateAvatarForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
