import { BiLogOutCircle } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/app/hooks';
import { logout } from '../../redux/features/authSlice';
import { toast } from 'react-toastify';
import { useLogoutMutation } from '../../services/RTKquery/auth.endpoints';

const Logout = () => {
  const [logOut] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleUserLogout = () => {
    dispatch(logOut);
    dispatch(logout());
    toast.success('Logged out successfully.');
    navigate('/auth');
  };

  return (
    <div
      className="flex gap-1 items-center mt-auto text-gray-400 cursor-pointer px-3 hover:text-cyan-300"
      onClick={handleUserLogout}
    >
      <BiLogOutCircle className="w-6 h-6" /> Logout
    </div>
  );
};
export default Logout;
