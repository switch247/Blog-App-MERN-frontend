import React from 'react';
import './login.css';
import back from '../../assets/images/my-account.jpg';
import { Context } from '../../context/Context';
import axios from 'axios';
import { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';

export const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const { user, dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({
      type: 'LOGIN_START',
    });
    try {
      const res = await axios.post('/auth/login', {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      res.status === 200 && res.data && window.location.replace('/');
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE' });
    }
  };
  return (
    <>
      <section className="login">
        <div className="container">
          <div className="backImg">
            <img src={back} alt="" />
            <div className="text">
              <h3>Login</h3>
              <h1>My account</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <span>Username or email address *</span>
            <input
              type="text"
              required
              placeholder="username..."
              ref={userRef}
            />
            <span>Password *</span>
            <input
              type="password"
              required
              placeholder="password..."
              ref={passwordRef}
            />
            <button className="button" type="submit" disabled={isFetching}>
              Log in
            </button>
          </form>
          <button className="button">
            {' '}
            <Link to="/register">Register</Link>
          </button>
        </div>
      </section>
    </>
  );
};
