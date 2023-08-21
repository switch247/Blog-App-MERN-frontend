import React, { useState } from 'react';

import './details.css';

import '../../components/header/header.css';
import img from '../../assets/images/b5.jpg';
import { BsPencilSquare } from 'react-icons/bs';
import { AiFillAlipaySquare, AiOutlineDelete } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { blog } from '../../assets/data/data';
import { useContext } from 'react';
import { Context } from '../../context/Context';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import Editor from "../../Editor";


export const DetailsPages = () => {
  const { id } = useParams();
  const [blogs, setBlogs] = useState(null);
  const PF = 'http://localhost:5000/images/';
  const { user } = useContext(Context);
  const location = useLocation();
  const path = location.pathname.split('/')[2];
  const [post, setPost] = useState({});

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    let blogs = blog.find((blogs) => blogs._id === parseInt(id));
    if (blogs) {
      setBlogs(blogs);
    }
    const getPost = async () => {
      const res = await axios.get('/posts/' + path);
      setPost(res.data);
      setDescription(res.data.desc);
      setTitle(res.data.title);
    };
    getPost();
    setUpdateMode(false);
  }, [blogs, path]);

  const handleDelete = async () => {
    try {
      // console.log(post,post.username === user.username);

      const res = await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace('/');
      console.log(post.username === user.username);
    } catch (e) {}
  };
  const handleUpdate = async () => {
    try {
      const res = await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc:description,
      });
      // console.log(res)
      setUpdateMode(false);
    } catch (e) {}
  };
// console.log(description)
  return (
    <>
      {post ? (
        <section className="singlePage">
          <div className="container">
            <div className="left">
              {
                post.photo ? (
                  <img className="post-image" src={PF + post.photo} />
                ) : (
                  <img
                    className="post-image"
                    src="https://source.unsplash.com/1080x720/?"
                    alt=""
                  />
                )
                //  default picture
              }
            </div>
            <div className="right">
              {
                // shouldn't always be visible
                post.username === user?.username && !updateMode ? (
                  <>
                    <div className="buttons">
                      <button
                        className="button"
                        onClick={(e) => setUpdateMode(true)}
                      >
                        <BsPencilSquare />
                      </button>
                      <button className="button" onClick={handleDelete}>
                        <AiOutlineDelete />
                      </button>
                    </div>
                  </>
                ):
                <div className="buttons">
                <button
                  className="button"
                  onClick={(e) => setUpdateMode(false)}
                >
                  <BsPencilSquare />
                </button>
        
              </div>

              }

              {updateMode ? (
                <>
                  <input
                    type="text"
                    value={title}
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                    className="single-post-title input"
                  ></input>
                  <br />
                
                  <Editor 
                     value={description}
                    onChange={setDescription} 
                    // value={content} 
                    // className="single-post-description input"
                   
                    // onChange={(e) => setDescription(e.target.value)}
                  />
                  <br />
                  <button onClick={handleUpdate} className="btn-update">
                    Update
                  </button>
                </>
              ) : (
                <>
                  <h1>{post.title}</h1>

                  {/* <div className="content" dangerouslySetInnerHTML={{__html:post.desc}}/> */}
                  <div   dangerouslySetInnerHTML={{ __html: description }} />
                  {/* <p>{post.desc}</p> */}
                </>
              )}

              <p>
                Author:
                <Link to={`/?user=${post.username}`} style={{ color: 'gold' }}>
                  <b>{post.username}</b>
                </Link>
              </p>
            </div>
          </div>
          <span>comments</span>32653

        </section>
      ) : null}

      {blogs ? (
        <section className="singlePage">
          <div className="container">
            <div className="left">
              <img src={blogs.cover} alt="" />
            </div>
            <div className="right">
              {
                // shouldn't always be visible
                <>
                  <div className="buttons">
                    <button className="button">
                      <BsPencilSquare />
                    </button>
                    <button className="button">
                      <AiOutlineDelete />
                    </button>
                  </div>
                </>
              }

              <h1>Betadine Feminine Wash</h1>
              <p>{blogs.desc}</p>
              <p>
                "But I must explain to you how all this mistaken idea of
                denouncing pleasure and praising pain was born and I will give
                you a complete account of the system, and expound the actual
                teachings of the great explorer of the truth, the master-builder
                of human happiness. No one rejects, dislikes, or avoids pleasure
                itself, because it is pleasure, but because those who do not
                know how to pursue pleasure rationally encounter consequences
                that are extremely painful. Nor again is there anyone who loves
                or pursues or desires to obtain pain of itself, because it is
                pain, but because occasionally circumstances occur in which toil
                and pain can procure him some great pleasure. To take a trivial
                example, which of us ever undertakes laborious physical
                exercise, except to obtain some advantage from it? But who has
                any right to find fault with a man who chooses to enjoy a
                pleasure that has no annoying consequences, or one who avoids a
                pain that produces no resultant pleasure?" Section 1.10.33 of
                "de Finibus Bonorum et Malorum", written by Cicero in 45 BC "At
                vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                rerum facilis est et expedita distinctio. Nam libero tempore,
                cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus id quod maxime placeat facere possimus, omnis voluptas
                assumenda est, omnis dolor repellendus. Temporibus autem
                quibusdam et aut officiis debitis aut rerum necessitatibus saepe
                eveniet ut et voluptates repudiandae sint et molestiae non
                recusandae. Itaque earum rerum hic tenetur a sapiente delectus,
                ut aut reiciendis voluptatibus maiores alias consequatur aut
                perferendis doloribus asperiores repellat."
              </p>
              <p>Author: Sunil</p>
            </div>
          </div>
          <span>No comments</span>
        </section>
      ) : null}
    </>
  );
};
