import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import store, { AppDispatch } from './store';
import { fetchUsers } from './features/user/userSlice';
import './App.css';
import UserList from './components/UserList';
import { LoginPage } from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  console.log(store.getState());
  return (
    <div>
      <UserList />
      <LoginPage />
      <RegisterPage />
    </div>
  );
};

export default App;
