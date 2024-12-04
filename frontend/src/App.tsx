import { useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Outlet } from "react-router-dom";
import socketService from "./services/socket.service";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from "./redux/app/hooks";
import { setSocketService } from "./redux/features/authSlice";

const App = () => {

  const connectSocket = async () => {
    await socketService
      .connect(import.meta.env.MODE === "development" ? "http://localhost:7001/" : "/")
      .catch(err => {
        console.log("Error", err);
      });
  }
  
  const dispatch = useAppDispatch();

  useEffect(() => {
    connectSocket();
    
      dispatch(setSocketService({ socketService: socketService.socket }));
    
      return () => {
        socketService.socket?.disconnect();
      }

    
  
  }, [dispatch]);
  
  
  return (
    <AppContainer>
      <ToastContainer />
      < Outlet />
    </AppContainer>
  )
}

export default App

const AppContainer = styled.div`
  ${tw`p-4 h-screen flex items-center justify-center`}
`;