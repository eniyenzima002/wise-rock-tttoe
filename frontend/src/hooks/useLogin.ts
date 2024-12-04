import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../services/RTKquery/auth.endpoints';
import { useAppDispatch } from '../redux/app/hooks';
import { toast } from 'react-toastify';
import { setUser } from '../redux/features/authSlice';
// import foreSound from '../sounds/fore.mp3';

// const foreAudio = new Audio(foreSound);
// foreAudio.volume = 0.1;

const loginInitialState = {
  username: '',
  password: '',
};

const useLogin = () => {
  const [formLogin, setFormLogin] = useState(loginInitialState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [
    loginUser,
    {
      data: loginUserData,
      isSuccess: isLoginSuccess,
      isError: isLoginError,
      isLoading: isLoginLoading,
      error: loginError,
    },
  ] = useLoginMutation();

  const { username, password } = formLogin;
  const handleLoginValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormLogin({ ...formLogin, [e.target.name]: e.target.value });
  };

  const handleLoginUser = async () => {
    if (username && password) {
      await loginUser({ username, password });
    } else {
      toast.error('Please fill in all inputs.');
    }
  };

  useEffect(() => {
    if (isLoginSuccess) {
      toast.success('Logged in Successfully.');
      dispatch(
        setUser({
          id: loginUserData.result.id,
          username: loginUserData.result.username,
          token: loginUserData.token
        })
        
      );
      navigate(`/${loginUserData.result.id}`);
      // foreAudio.play()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isLoginSuccess]);

  useEffect(() => {
    if (isLoginError) {
      toast.error((loginError as any).data.error);
    }
  }, [isLoginError, loginError]);

  return { handleLoginValue, handleLoginUser, isLoginLoading, formLogin };
};

export default useLogin;
