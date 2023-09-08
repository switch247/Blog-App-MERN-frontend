import React from 'react';
import {PF} from '../../App';
import './blog.css';
import { blog } from '../../assets/data/data';
import {
  AiOutlineTags,
  AiOutlineClockCircle,
  AiOutlineComment,
  AiOutlineShareAlt,
} from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const Card = () => {
  // const PF = 'http://localhost:5000/images/';
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  // console.log(search);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('/posts' + search);
      setPosts(res.data);
      // console.log(res)
    };
    fetchPosts();
  }, [search]);

  return (
    <>
      <section className="blog">
        <div className="container grid3">
          {blog.map((item) => (
            <div className="box boxItems" key={item._id}>
              <div className="img">
                <img src={item.cover} alt="" />
              </div>
              <div className="details">
                <div className="tag">
                  <AiOutlineTags className="icon" />
                  {item.categories.split(' ').map((cat, idx) => (
                    <a href="/" key={idx}>
                      #{cat}{' '}
                    </a>
                  ))}
                </div>
                <Link to={`/details/${item._id}`} className="link">
                  <h3>{item.title}</h3>
                </Link>
                <p>{item.desc.slice(0, 180)}...</p>
                <div className="date">
                  <AiOutlineClockCircle className="icon" />{' '}
                  <label htmlFor="">{item.date}</label>
                  <AiOutlineComment className="icon" />{' '}
                  <label htmlFor="">27</label>
                  <AiOutlineShareAlt className="icon" />{' '}
                  <label htmlFor="">SHARE</label>
                </div>
              </div>
            </div>
          ))}

          {posts ?
            posts.map((item) => (
              <div className="box boxItems" key={item._id}>
                <div className="img">
                  {item.cover ? (
                    <img src={ PF +item.cover} alt="" />
                  ) : (
                    <img
                      className="post-image"
                      src="https://source.unsplash.com/1080x720/?"
                      alt=""
                    />
                  )}
                </div>
                <div className="details">
                  <div className="tag">
                    <AiOutlineTags className="icon" />
                    {item.categories.map((cat, idx) => (
                      <a href="/" key={idx}>
                        #{cat}{' '}
                      </a>
                    ))}
                  </div>
                  <Link to={`/details/${item._id}`} className="link">
                    <h3>{item.title}</h3>
                  </Link>

                  {/* <p>{item.desc}...
                  </p> */}
                  <div   dangerouslySetInnerHTML={{ __html: item.desc }
                  } />
            
                  



                  <div className="date">
                    <AiOutlineClockCircle className="icon" />{' '}
                    <label htmlFor="">{ new Date(item.updatedAt).toDateString()}</label>
                    <AiOutlineComment className="icon" />{' '}
                    <label htmlFor="">{item?.comments}</label>
                    <AiOutlineShareAlt className="icon" />{' '}
                    <label htmlFor="">SHARE</label>
                  </div>
                </div>
              </div>
            ))
          :
          <p>no posts</p>}

          
        </div>
      </section>
    </>
  );
};
