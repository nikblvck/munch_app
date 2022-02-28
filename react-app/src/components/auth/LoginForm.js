import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(username, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/posts' />;
  }

  return (
    <div className="main_auth_container">
      <div className="auth_container" id="login">
        <h1 className="sign_up_header">Login</h1>
    <form onSubmit={onLogin}>
      <div className="auth_errors">
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className="auth_input">
        <label htmlFor='email'>Username</label>
        <input
          name='username'
          type='text'
          placeholder='Username'
          value={username}
          onChange={updateUsername}
        />
      </div>
      <div className="auth_input">
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          value={password}
          onChange={updatePassword}
        />
        <div className="auth_btn_div">
        <button className ="auth_btn" type='submit'>Login</button>
        <button className ="auth_btn"><Link to="/signup">Don't Have An Account?</Link></button>
        </div>
      </div>
    </form>
    </div>
    </div>
  );
};

export default LoginForm;
