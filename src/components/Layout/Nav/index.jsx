import { NavLink, useLocation } from 'react-router-dom';
import LogoutButton from '../../../Auth/LogoutButton';
import { useToken } from '../../../stores/useUserStore';

export default function Navbar() {
  const currentLocation = useLocation();
  const token = useToken();

  return (
    <header>
      <nav className='navbar  bg-primary text-primary-content'>
        <div className='flex-1'>
          <NavLink
            to='/'
            className={`btn btn-ghost text-xl ${
              currentLocation.pathname === '/' ? 'font-bold underline' : ''
            }`}
          >
            Holidaze
          </NavLink>
        </div>
        <div className='flex-1'>
          {!token ? (
            <>
              <NavLink
                to='/login'
                className={`btn btn-secondary text-xl ${
                  currentLocation.pathname === '/login' ? 'font-bold underline' : ''
                }`}
              >
                Login
              </NavLink>
              <NavLink
                to='/register'
                className={`btn btn-ghost text-xl ${
                  currentLocation.pathname === '/register' ? 'font-bold underline' : ''
                }`}
              >
                Register
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to='/dashboard'
                className={`btn btn-ghost text-xl ${
                  currentLocation.pathname === '/dashboard' ? 'font-bold underline' : ''
                }`}
              >
                Dashboard
              </NavLink>
              <LogoutButton />
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
