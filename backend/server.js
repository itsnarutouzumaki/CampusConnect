const mongoose=require('mongoose');
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const app=express();
const dotenv=require('dotenv');
const path=require('path');
dotenv.config();
const PORT=process.env.PORT || 1000;
//middlewares
const upload=require('./Middlewares/upload');
//routes
const courseRouter=require('./Routes/Course');
const assignmentRouter=require('./Routes/Assignment');
const chapterRouter=require('./Routes/Chapter');
app.use(bodyParser.json());

//using cors to connect backend and frontend
app.use(cors({
    origin:true,
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}));

//home testing route
app.get('/',(req,res)=>res.json({message:"this is a home route"}));

//using course router
app.use('/backend/course',courseRouter);

//using assignment router
app.use('/backend/assignment',assignmentRouter);

//using chapter router
app.use('/backend/chapter',chapterRouter);

// Serve the uploads directory
// app.use('/uploads', express.static('uploads'));

let username=process.env.Database_UserName;
let password=process.env.Database_password;

mongoose.connect(
    `mongodb+srv://${username}:${password}@cluster0.dohre.mongodb.net/`,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName:"CampusConnect"
    }
).then(()=>console.log("MongoDb Connected Successfully ...!")).catch((err)=>
console.log(err));


app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
});

