import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { loginUser, selectCurrentUser } from '../features/currentUser/currentUserSlice';
import { useSelector } from 'react-redux';
import { selectUsers } from '../features/user/userSlice';

export const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState('');
  const users = useSelector(selectUsers);

  const handleLogin = () => {
    const user = users.find((user) => user.email === email);
    if (user !== undefined) {
      dispatch(loginUser(user));
    } else {
      console.log('error');
    }
  };

  const loggedUser = useSelector(selectCurrentUser);

  return (
    <div>
      <div>Login</div>
      <input type='email' name='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <div>{loggedUser ? loggedUser.name : 'no user'}</div>
    </div>
  );
};
