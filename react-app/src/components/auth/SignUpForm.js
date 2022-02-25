import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory} from 'react-router-dom';
import { signUp } from '../../store/session';
import './Auth.css';

const SignUpForm = () => {
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('')
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(first_name, last_name, username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  }

  const updateLastName = (e) => {
    setLastName(e.target.value);
  }

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const handleClick = e => {
    e.preventDefault();
    history.push('/login');
  };

  if (user) {
    return <Redirect to='/posts' />;
  }

  return (
    <>
    <div className="main_auth_container">
      <div className="auth_container">
        <h1 className="sign_up_header">Sign Up</h1>
        <form onSubmit={onSignUp}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className="auth_input">
            <label> First Name</label>
            <br />
            <input
              type="text"
              name="first_name"
              onChange={updateFirstName}
              value={first_name}
            />
          </div>
          <div className="auth_input">
            <label> Last Name</label>
            <br />
            <input
              type="text"
              name="last_name"
              onChange={updateLastName}
              value={last_name}
            />
          </div>
          <div className="auth_input">
            <label>User Name</label>
            <br />
            <input
              type="text"
              name="username"
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div className="auth_input">
            <label>Email</label>
            <br />
            <input
              type="text"
              name="email"
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div className="auth_input">
            <label>Password</label>
            <br />
            <input
              type="password"
              name="password"
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div className="auth_input">
            <label>Repeat Password</label>
            <br />
            <input
              type="password"
              name="repeat_password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <div className="auth_btn_div">
            <button className="auth_btn" type="submit" disabled={errors.length}>
              Sign Up
            </button>
            <button onClick={handleClick}>
              Have An Account?
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default SignUpForm;
