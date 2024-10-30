const mongoose=require('mongoose');
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const app=express();
const dotenv=require('dotenv');
dotenv.config();
const PORT=process.env.PORT || 1000;
//routes
const courseRouter=require('./Routes/Course');
const assignmentRouter=require('./Routes/Assignment');
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

