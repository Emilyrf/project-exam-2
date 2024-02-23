import { NavLink } from 'react-router-dom';
import LogoutButton from '../../../Auth/LogoutButton';
import { useStore } from '../../../stores/useStore';

export default function Navbar() {
  const token = useStore((state) => state.token);

  return (
    <header>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {!token ? (
                <>
                  <NavLink to='/register' className={`btn btn-ghost text-2xl`}>
                    Register
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to='/dashboard' className={`btn btn-ghost text-2xl`}>
                    Dashboard
                  </NavLink>
                </>
              )}
            </ul>
          </div>
          <NavLink to='/' className="btn btn-ghost text-2xl">
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-10 w-10'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth='2'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
              />
            </svg>
            Holidaze
          </NavLink>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
          {!token ? (
                <>
                  <NavLink to='/register' className={`btn btn-ghost text-2xl`}>
                    Register
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to='/dashboard' className={`btn btn-ghost text-2xl`}>
                    Dashboard
                  </NavLink>
                </>
              )}
          </ul>
        </div>
        <div className="navbar-end">
          {!token ? (
            <>
              <NavLink to='/login' className={`btn text-2xl`}>
                Login
              </NavLink>
            </>
          ) : (
            <>
              <LogoutButton />
            </>
          )}
        </div>
      </div>
    </header>
  );
}
