import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { store } from './redux/app/store.ts';
import { Provider } from 'react-redux';
import App from './App.tsx';
import './index.css';
import UserAuth from './pages/UserAuth.tsx';
import Dashboard from './pages/Dashboard.tsx';
import GameHistory from './components/Results/GameResult.tsx';
import PrivateRoute from './redirect/PrivateRoute.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Navigate to="/auth" replace />} />
      <Route path="/auth" element={<UserAuth />} />
      <Route path="/:id" element={<Dashboard />} />
      <Route path="/join/:id" element={<Dashboard />} />
      <Route path="/results/:id" element={<Dashboard />} />
      <Route path="/game_result/:id" element={<GameHistory />} />
      <Route path="*" element={<PrivateRoute children={undefined} />} />
    </Route>
  )
);

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
);
