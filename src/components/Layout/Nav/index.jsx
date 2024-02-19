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
          className={`btn btn-ghost text-xl ${currentLocation.pathname === '/' ? 'font-bold text-primary underline' : ''
            }`}
        >
          Holidaze
        </NavLink>


        {!token ? (
          <>
            <NavLink
              to='/register'
              className={`btn btn-ghost text-xl ${currentLocation.pathname === '/register' ? 'font-bold text-primary underline' : ''
                }`}
            >
              Register
            </NavLink>
            <NavLink
              to='/login'
              className={`btn btn-secondary text-xl ${currentLocation.pathname === '/login' ? 'font-bold text-primary' : ''
                }`}
            >
              Login
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to='/dashboard'
              className={`btn btn-ghost text-xl ${currentLocation.pathname === '/dashboard' ? 'font-bold text-primary underline' : ''
                }`}
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
