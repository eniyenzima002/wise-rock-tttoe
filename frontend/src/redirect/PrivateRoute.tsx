import { useSelector } from 'react-redux';
import { selectAuth } from '../redux/features/authSlice';
import RedirectAuth from './RedirectAuth';

const PrivateRoute = ({ children }: { children: any }) => {
  const { token } = useSelector(selectAuth);
  return token ? children : <RedirectAuth />;
};
export default PrivateRoute;
