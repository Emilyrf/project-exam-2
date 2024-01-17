import { NavLink, useLocation } from "react-router-dom"

export default function Navbar() {
    const currentLocation = useLocation()

    return (
        <header>
            <nav className='navbar  bg-primary text-primary-content'>
                <div className="flex-1">
                    <NavLink to='/' className={`btn btn-ghost text-xl ${currentLocation.pathname === '/'
                            ? 'font-bold underline'
                            : ''
                        }`}>
                        Holidaze
                    </NavLink>
                </div>
                <div className="flex-1">
                    <NavLink to='/login' className={`btn btn-ghost text-xl ${currentLocation.pathname === '/login'
                            ? 'font-bold underline'
                            : ''
                        }`}>
                        Login
                    </NavLink>
                    <NavLink to='/register' className={`btn btn-ghost text-xl ${currentLocation.pathname === '/register'
                            ? 'font-bold underline'
                            : ''
                        }`}>
                        Register
                    </NavLink>
                </div>



            </nav>
        </header>

    )
}