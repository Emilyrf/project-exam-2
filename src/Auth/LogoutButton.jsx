import { useNavigate } from 'react-router-dom';
import { useStore } from '../stores/useStore';

function LogoutButton() {

  const setUser = useStore((state) => state.setUser);
  const setToken = useStore((state) => state.setToken);
  const navigate = useNavigate();

  function handleLogout() {
    setToken(null);
    setUser({
      name: null,
      email: null,
      avatar: null,
      venueManager: false,
    });
    navigate('/');
  }

  return (
    <button className='btn btn-active btn-accent text-xl' onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutButton;
