import { useNavigate } from 'react-router-dom';
import { useStore } from '../stores/useStore';

function LogoutButton() {

  const navigate = useNavigate();
  const clearStore = useStore((state) => state.clearStore);

  function handleLogout() {
    clearStore()
    navigate('/');
  }

  return (
    <button className='btn btn-active btn-accent text-xl' onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutButton;
