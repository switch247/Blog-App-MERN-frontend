import React, { useState } from 'react';
import { IoSettingsOutline } from 'react-icons/io5';
import { BsBagCheck } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';
import { GrHelp } from 'react-icons/gr';
import { BiLogOut } from 'react-icons/bi';
import { RiImageAddLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../context/Context';
import {PF} from '../../App';

export const User = () => {
  const { user, dispatch } = useContext(Context);
  // const PF = 'http://localhost:5000/images/';

  const handlelogout = () => {
    dispatch({ type: 'LOGOUT' });
    window.location.replace("/");
  };
  const handlelogin = ()=>{
    window.location.replace("/login");
  }
  const handleregister = ()=>{
    window.location.replace("/register");
  }

  // const user = true
  const [profileOpen, setProfileOpen] = useState(false);
  const close = () => {
    setProfileOpen(false);
  };
  return (
    <>
      <div className="profile">
        {user ? (
          <>
            <button
              className="img"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              {
                user.profilePic ? (
                  <img
                    className="profile-picture"
                    src={PF + user.profilePic}
                    alt="pic"
                  />
                ) : (
                  <img
                    src="https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt=""
                  />
                )

                /* default picture if picture not available */
              }
            </button>
            {profileOpen && (
              <div className="openProfile boxItems" onClick={close}>
                <Link to="/account">
                  <div className="image">
                    <div className="img">
                      {
                        user.profilePic ? (
                          <img
                            className="profile-picture"
                            src={PF + user.profilePic}
                            alt="pic"
                          />
                        ) : (
                          <img
                            src="https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg?auto=compress&cs=tinysrgb&w=600"
                            alt=""
                          />
                        )

                        /* default picture if picture not available */
                      }
                    </div>
                    <div className="text">
                      <h4>{user.username}</h4>
                      <label>Addis Ababa, Ethiopia</label>
                    </div>
                  </div>
                </Link>
                <Link to="/create">
                  <button className="box">
                    <RiImageAddLine className="icon" />
                    <h4>Create Post</h4>
                  </button>
                </Link>
                <Link to="/account">
                  <button className="box">
                    <IoSettingsOutline className="icon" />
                    <h4>My Account</h4>
                  </button>
                </Link>
                {/* <button className='box'>
                  <BsBagCheck className='icon' />
                  <h4>My Order</h4>
                </button> */}
                {/* <button className='box'>
                  <AiOutlineHeart className='icon' />
                  <h4>Wishlist</h4>
                </button> */}
                <button className="box">
                  <GrHelp className="icon" />
                  <h4>Help</h4>
                </button>
                <button onClick={handlelogout}
                  className="box"
                >
                  <BiLogOut className="icon" />
                  <h4>Log Out</h4>
                </button>
              </div>
            )}
          </>
        ) : (
          <>
         
          <button onClick={ handlelogin } >Login</button>
          &nbsp;&nbsp;
          <button onClick={ handleregister}>Register</button>
          </>
        )}
      </div>
    </>
  );
};
