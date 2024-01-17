import { Outlet } from 'react-router-dom'
import Navbar from "./Nav"
import Footer from "./Footer"

function Layout() {
    return (
        <div>
            <Navbar />
            <div className='grid grid-rows-[auto_1fr_auto] min-h-screen'>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Layout