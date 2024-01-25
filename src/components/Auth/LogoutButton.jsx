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
    <button className='btn btn-active btn-accent' onClick={handleLogout}>
      Log Out
    </button>
  );
}

export default LogoutButton;
