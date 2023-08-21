const  router  = require("express").Router();
const User = require('../models/User');
const bcrypt = require("bcrypt");
// Register
router.post('/register', async (req, res) => {
  try {

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password,salt)

    // User(req.body)
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password:hashPass,
    });
    // console.log("test .save")

    const user = await newUser.save()
      .then((savedUser) => {
        console.log('User saved:', savedUser);
        res.status(200).json(savedUser);

      })
      .catch((error) => {
        // 208 Already Reported (WebDAV)
        res.status(208).json();
        // .json();
        console.error('Error saving user:');
        // error
      });
    // res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ err: err });
    // res.send.json(user);
    console.log('authentication failed',err);
  }
});

// Login
router.post('/login', async (req, res) => {
    try{
        const user = await User.findOne( {username : req.body.username})
        if (!user){ res.status(400).json("Wrong Credentials"); return;}
        
        const validated = await bcrypt.compare(req.body.password,user.password)
        if (!validated ) {res.status(400).json("Wrong Credentials"); return ;}
        
        const { password, ...others } = user._doc
        res.status(200).json(others)
    
    }   

    catch(err){
        res.status(500).json(err)
    }

});

module.exports = router;

// const mongoose = require('mongoose');

// // Define a schema
// const userSchema = new mongoose.Schema({
//   name: String,
//   age: Number,
// });

// // Create a model based on the schema
// const User = mongoose.model('User', userSchema);

// // Create a new user document
// const newUser = new User({
//   name: 'John Doe',
//   age: 25,
// });

// // Save the document to the database
// newUser.save()
//   .then(savedUser => {
//     console.log('User saved:', savedUser);
//   })
//   .catch(error => {
//     console.error('Error saving user:', error);
//   });
