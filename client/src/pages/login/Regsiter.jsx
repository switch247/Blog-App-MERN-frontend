import React from 'react';
import './login.css';
import back from '../../assets/images/my-account.jpg';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { rootUrl } from '../../App';

export const Regsiter = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const [error, setError] = useState(false);

  const handlesubmit = async (e) => {
    e.preventDefault();
    // prevents reload
    setError(false);

    if (password === password2) {
      // Passwords match, perform desired action
      try {
        const res = await axios.post(`${rootUrl}/auth/register`, {
          username,
          email,
          password,
        });
        console.log(res);
        res.status === 200 && res.data && window.location.replace('/login');
      } catch (e) {
        console.log(e);
        setError(true);
      }
    } else {
      // Passwords do not match
      setPasswordsMatch(false);
      setError(true);
    }
  };

  return (
    <>
      <section className="login">
        <div className="container">
          <div className="backImg">
            <img src={back} alt="" />
            <div className="text">
              <h3>Register</h3>
              <h1>My account</h1>
            </div>
          </div>

          <form onSubmit={handlesubmit}>
            <span>Email address *</span>
            <input
              type="text"
              required
              placeholder="Enter Your email..."
              onChange={(e) => setEmail(e.target.value)}
            />
            <span>Username *</span>
            <input
              type="text"
              required
              placeholder="Enter Your username..."
              onChange={(e) => setUsername(e.target.value)}
            />
            <span>Password *</span>
            <input
              type="password"
              required
              placeholder="Enter Your passsword..."
              onChange={(e) => setPassword(e.target.value)}
            />
            <span>Conform Password *</span>
            {!passwordsMatch && <label>passwords must match!</label>}
            <input
              type="password"
              required
              placeholder="confirm password..."
              onChange={(e) => setPassword2(e.target.value)}
            />
            
            <button className="button" type="submit">
              Register
            </button>
            {error && <label>Something went wrong!</label>}
          </form>

          {
            <>
              <br />
              <button className="button">
                <Link to="/login">Log In</Link>
              </button>
              <br />
              
              
            </>
          }
        </div>
      </section>
    </>
  );
};
