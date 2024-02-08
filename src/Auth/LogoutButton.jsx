import { useNavigate } from 'react-router-dom';
import { useUserActions } from '../stores/useUserStore';

function LogoutButton() {
  const { clearUser, clearUserSubs } = useUserActions();

  const navigate = useNavigate();

  function handleLogout() {
    clearUser();
    clearUserSubs();
    navigate('/');
  }

  return (
    <button className='btn btn-active btn-accent text-xl' onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutButton;
