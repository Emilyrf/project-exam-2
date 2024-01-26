import { useNavigate } from 'react-router-dom';
import { useUserActions } from '../../stores/useUserStore';

function LogoutButton() {
  const { clearUser } = useUserActions();

  const navigate = useNavigate();

  function handleLogout() {
    clearUser();
    navigate('/');
  }

  return (
    <button className='btn btn-active btn-accent text-xl' onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutButton;
