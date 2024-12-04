import { useEffect, useState } from 'react';
import { useRegisterMutation } from '../services/RTKquery/auth.endpoints';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/app/hooks';
import { setUser } from '../redux/features/authSlice';

const registerInitialState = {
  email: '',
  password: '',
  confirmPassword: '',
};

const useRegister = () => {
  const [formRegister, setFormRegister] = useState(registerInitialState);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { email, password, confirmPassword } = formRegister;
  const handleRegisterValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormRegister({ ...formRegister, [e.target.name]: e.target.value });
  };

  const [
    registerUser,
    {
      data: registerUserData,
      isSuccess: isRegisterSuccess,
      isError: isRegisterError,
      isLoading: isRegisterLoading,
      error: registerError,
    },
  ] = useRegisterMutation();

  const handleRegisterUser = async () => {
    if (password !== confirmPassword) {
      return toast.error("Password doesn't match.");
    }

    if (email && password) {
      await registerUser({ email, password, confirmPassword });
    } else {
      toast.error('Please fill in all inputs.');
    }
  };

  useEffect(() => {
    if (isRegisterSuccess) {
      toast.success('Registered - Successfully.');
      dispatch(
        setUser({
          id: registerUserData.result.id,
          username: registerUserData.result.username,
          token: registerUserData.token,
        })
      );
      navigate(`/${registerUserData.result.id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRegisterSuccess]);

  useEffect(() => {
    if (isRegisterError) {
      toast.error((registerError as any).data.error);
    }
  }, [isRegisterError, registerError]);

  return {
    handleRegisterValue,
    handleRegisterUser,
    isRegisterLoading,
    formRegister,
  };
};

export default useRegister;
