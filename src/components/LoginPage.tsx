import React, { MouseEventHandler, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../tools/store';
import { loginUser } from '../features/currentUser/currentUserSlice';
import { useSelector } from 'react-redux';
import { selectUsers } from '../features/user/userSlice';
import { Link, useNavigate } from 'react-router-dom';

export const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState('');
  const [loginError, setLoginError] = useState(false);
  const users = useSelector(selectUsers);
  const navigate = useNavigate();

  const handleLogin: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    const user = users.find((user) => user.email === email);
    if (user !== undefined) {
      dispatch(loginUser(user));
      setLoginError(false);
      navigate('/');
    } else {
      setLoginError(true);
    }
  };

  return (
    <div className='min-h-screen min-w-screen flex justify-center items-center bg-slate-900'>
      <div className='flex flex-col justify-center px-6 py-12 w-2/5'>
        <h2 className='mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-white'>Login to your account</h2>
        <div className='mt-20'>
          <form className='space-y-10'>
            <div>
              <div>
                <label htmlFor='email' className='block text-md font-medium leading-6 text-white'>
                  Email address
                </label>
              </div>
              <div className=''>
                <input
                  type='email'
                  name='email'
                  id='email'
                  autoComplete='email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='block mt-2 w-full rounded-md border-0 py-2 bg-slate-700 text-white shadow-sm ring-1 ring-inset ring-slate-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
                />
              </div>
              <div className='text-red-700 leading-8 text-right'>{loginError && 'Email was not found!'}</div>
            </div>
            <div>
              <button
                type='submit'
                onClick={handleLogin}
                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Login
              </button>
            </div>
          </form>
          <div className='text-md mt-6 text-white text-center'>
            Not a member?{' '}
            <Link to='/register'>
              <b className='text-indigo-600 cursor-pointer'>Sign up</b>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
