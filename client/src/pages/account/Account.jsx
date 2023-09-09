import React from 'react';
import image from '../../assets/images/input.png';
import './account.css';
// updating account
import { rootUrl } from '../../App';
import { useContext, useState } from 'react';
import { Context } from '../../context/Context';
import axios from 'axios';

export const Account = () => {
  const { user, dispatch } = useContext(Context);
  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState(user?.password);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState(null);

  const PF = 'http://localhost:5000/images/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'UPDATE_START' });
    try {
      const updatedUser = {
        userId: user._id,
        // bc params takes id
        username,
        
        password,
      };
      if (file) {
        const data = new FormData();
        const fileName = Date.now() + file.name;
        data.append('name', fileName);
        data.append('file', file);
        updatedUser.profilePic = fileName;
        try {
          const r = await axios.post(`${rootUrl}/upload`, data);
          // console.log("file uploaded",r)
        } catch (e) {
          // console.log(e)
        }
      }
      try {
        const res = await axios.put(`${rootUrl}/users/` + user._id, updatedUser);
        setSuccess(true);
        dispatch({ type: 'UPDATE_SUCCESS', payload: res.data });

        // console.log(res)
        // window.location.replace('/post/' + res.data._id);
      } catch (er) {
        // console.log(er)
        dispatch({ type: 'UPDATE_FAILURE' });
      }
    } catch (err) {
      // console.log(err)
      // dispatch({ type: 'UPDATE_FAILURE' });
    }
  };

  return (
    <>
      <section className="accountInfo">
        <div className="container boxItems">
          <form onSubmit={handleSubmit}>
            <h1>Account Information</h1>
            <div className="content">
              <div className="left">
                <div className="img flexCenter">
                  <input
                    type="file"
                    accept="image/*"
                    // src={image}
                    alt="img"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  {user.profilePic ? (
                    <img
                      src={
                        file ? URL.createObjectURL(file) : PF + user.profilePic
                      }
                      alt=""
                    />
                  ) : (
                    <img src={image} alt="image" class="image-preview" />
                  )}
                </div>
              </div>
              <div className="right">
                
                {/* <label htmlFor="">Email</label>
                <input
                  type="email"
                  disabled={false}
                  placeholder={user.email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                /> */}

                <label htmlFor="">Username</label>
                <input
                  type="text"
                  disabled={false}
                  placeholder={user.username}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <label htmlFor="">Password</label>
                <input
                  type="password"
                  placeholder="password"
                  // value={password}
                  // disabled={true}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <>
                  {/* <button onClick={setShowPassword(!showPassword)}>
                    {showPassword ? 'Hide' : 'Show'} Password
                  </button> */}
                </>

                <button className="button" type="submit">
                  Update
                </button>
                <br />
                {success && (
                  <span
                    style={{
                      color: 'green',
                      marginTop: '10px',
                      alignSelf: 'center',
                    }}
                  >
                    Profile has been updated
                  </span>
                )}
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
