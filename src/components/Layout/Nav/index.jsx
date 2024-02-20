import { NavLink, useLocation } from 'react-router-dom';
import LogoutButton from '../../../Auth/LogoutButton';
import { useStore } from '../../../stores/useStore';

export default function Navbar() {
  const currentLocation = useLocation();
  const token = useStore((state) => state.token);

  return (
    <header>
      <nav className='flex h-20 bg-base-200 justify-center items-center px-5 md:gap-x-12 px-5 sm:rounded-xl sm:m-5'>
        <NavLink
          to='/'
          className={`btn btn-ghost text-xl`}
        >
          Holidaze
        </NavLink>
        
        {!token ? (
          <>
            <NavLink
              to='/register'
              className={`btn btn-ghost text-xl`}
            >
              Register
            </NavLink>
            <NavLink
              to='/login'
              className={`btn btn-secondary text-xl`}
            >
              Login
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to='/dashboard'
              className={`btn btn-ghost text-xl`}
            >
              Dashboard
            </NavLink>
            <LogoutButton />
          </>
        )}

      </nav>
    </header>
  );
}