import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import VenuePage from './pages/Venue';
import NotFound from './pages/NotFound';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
       <Route path='/'>
       <Route index element={<Homepage />} />
        <Route path='venue/:id' element={<VenuePage />} />
        <Route path='login' element={<LoginPage/>} />
        <Route path='register' element={<RegisterPage />} />
        <Route path='*' element={<NotFound />} />
       </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes;
