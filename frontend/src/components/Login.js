import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { API_URL } from '../utils/urls';
import user from '../reducers/user';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('signup');

  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errors = useSelector(store => store.user.error);

  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
  }, [accessToken, navigate]);

  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    };

    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId));
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setUsername(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setError(data.response));
          });
        }
      });
  };

  return (
    <main className="mainContainer">
      {mode === 'signup' ? <div className="top-login">Create a user</div> : <div className="top-login">Login with your user</div>}
      
      {/* <Link className="to-start" to="/">Go to start</Link> */}
      <h1>Melde dich an um auf dem Laufenden zu bleiben!</h1>
      <div className="choose-type">
        <div className="signup">
          <input
            id="signup"
            type="radio"
            checked={mode === 'signup'}
            onChange={() => setMode('signup')}
          />
          <label htmlFor="signup">Sign up!</label>
        </div>

        <div className="signin">
          <input
            id="signin"
            type="radio"
            checked={mode === 'signin'}
            onChange={() => setMode('signin')}
          />
          <label htmlFor="signin">Sign In!</label>
        </div>
      </div>

      <form className="form" onSubmit={onFormSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password {errors && <p className="warning-login">Please enter a password!</p>}</label> 
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {mode === 'signup' ? <button disabled={username.length < 5} className="login" type="submit">Create user</button> : <button disabled={username.length < 5} className="login" type="submit">Login</button>}
        {username.length < 5 ? <p className="warning">Your username needs to be longer than 5 characters!</p> : <p></p>}
        
      </form>
    </main>
  );
};

export default Login;