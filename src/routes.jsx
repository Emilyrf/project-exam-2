import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/Layout';
import Homepage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import DashboardPage from './pages/Dashboard';
import VenuePage from './pages/Venue';
import NotFound from './pages/NotFound';
import CreateVenuePage from './pages/CreateVenue';
import EditVenuePage from './pages/EditVenue'


const queryClient = new QueryClient();

function AppRoutes() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path='venue/:id' element={<VenuePage />} />
            <Route path='login' element={<LoginPage />} />
            <Route path='register' element={<RegisterPage />} />
            <Route path='dashboard' element={<DashboardPage />} />
            <Route path='create' element={<CreateVenuePage />} />
            <Route path='edit/:id' element={<EditVenuePage />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default AppRoutes;
