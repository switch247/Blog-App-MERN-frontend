const express = require("express")
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const authRoute = require("./routes/auth")
const usersRoute = require("./routes/users")
const postsRoute = require("./routes/posts")
const categoriesRoute = require("./routes/categories")
const multer = require("multer");
const path = require("path");
const cors = require("cors");


dotenv.config()
app.use(cors());
app.use(express.json());
app.use(cors({
    origin: 'https://bloghub-lcpx.onrender.com/'
  }));
  

app.use("/images",express.static(path.join(__dirname,"/images")))

app.get('/', (req, res) => {
    res.send("Welcome to our ToDo")
})




mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useFindAndModify:true,
}).then(
    console.log("Connected to MongoDB",)
    )
    .catch( er => console.log(er) )

const storage = multer.diskStorage({
    destination:(req, file, callbackfunc)=>{
        callbackfunc(null,"images")
    },
    filename:(req, file, callbackfunc)=>{
        callbackfunc(null,req.body.name)
        // "hello.png" for testing post man for client req.body.name
    }
})

const upload = multer ({storage:storage})
app.post("/api/upload", upload.single("file"), (req,res) => {
    res.status(200).json("file has been uploaded")
})


app.use("/api/auth",authRoute)
app.use("/api/users",usersRoute)
app.use("/api/posts",postsRoute)
app.use("/api/categories",categoriesRoute)

 

  
app.listen(
    5000, ()=>{
        console.log("Backend is running")
    }
)



