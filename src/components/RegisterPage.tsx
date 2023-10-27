import React, { useState } from 'react';
import { registerUser } from '../features/user/userSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

  const dispatch = useDispatch<AppDispatch>();

  const handleRegister = () => {
    dispatch(registerUser({ email, name, username }));
  };

  return (
    <div>
      <input type='email' name='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type='name' name='name' id='name' value={name} onChange={(e) => setName(e.target.value)} />
      <input type='username' name='username' id='username' value={username} onChange={(e) => setUsername(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegisterPage;
