import React from 'react';
import './create.css';
import { IoIosAddCircleOutline } from 'react-icons/io';
import axios from 'axios';
import { Context } from '../../context/Context';
import { useContext, useState } from 'react';
import { category } from '../../assets/data/data';
import Editor from "../../Editor";

export const Create = () => {

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  const [selectedCats, setSelectedCats] = useState([]);
  
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCats((prevSelectedCats) => [...prevSelectedCats, value]);
    } else {
      setSelectedCats((prevSelectedCats) =>
        prevSelectedCats.filter((cat) => cat !== value)
      );
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedCats);

    try {
      const newPost = {
        username: user.username,
        title,
        desc,
        categories:selectedCats, 
      };
      if (file) {
        const data = new FormData();
        const fileName = Date.now() + file.name;
        data.append('name', fileName);
        data.append('file', file);
        newPost.cover = fileName;
        try {
          await axios.post('/upload', data);
          console.log('file uploaded');
        } catch (e) {
          console.log(e);
        }
      }
      try {
        const res = await axios.post('/posts/', newPost);
        console.log('posted??');

        window.location.replace('/details/' + res.data._id);
      } catch (er) {
        console.log(er);
      }
    } catch (err) {
      console.log(err);
    }
  };

    const handle = (event) => {
      event.preventDefault();
      console.log(selectedCats);
    };



  return (
    <>
      <section className="newPost">
        <div className="container boxItems">
          <div className="img ">
            {file ? (
              <img
                className="write-image"
                src={URL.createObjectURL(file)}
                alt=""
              />
            ) : (
              // if else add later
              <label htmlFor="file-input">
                <img
                  src="https://images.pexels.com/photos/6424244/pexels-photo-6424244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="image"
                  className="image-preview"
                />
              </label>
            )}
          </div>
          <form  onSubmit={handleSubmit}>
            <div className="inputfile flexCenter">
              <input
                type="file"
                name=""
                accept="image/*"
                alt="img"
                id="file-input"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <input
              type="text"
              placeholder="Title"
              autoFocus={true}
              required
              onChange={(e) => setTitle(e.target.value)}
            />

            <Editor
              // type="text"
              placeholder="Tell your story..."
              // cols="30"
              // rows="10"
              required
              onChange={setDesc}
              value={desc}
              // onChange={(e) => setDesc(e.target.value)}
            />
            <br/>
            <div className="cats">
           
              {category.map(({category,id},index) => (
                   
                        <div key={index}>
                        <label>
                          <input
                            type="checkbox"
                            value={category}
                            checked={selectedCats.includes(category)}
                            onChange={handleCheckboxChange}
                          />
                          {category}
                        </label>
                      </div>
              

              ))}
            </div>
            <br/>
            <button className="button" type="submit">
              Create Post
            </button>
          </form>
        </div>
      </section>
    </>
  );
};
