const mongoose=require('mongoose');
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const app=express();
const PORT=process.env.PORT || 1000;
//routes
const courseRouter=require('./Routes/Course');

app.use(bodyParser.json());

//using cors to connect backend and frontend
app.use(cors({
    origin:true,
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}));

//home testing route
app.get('/',(req,res)=>res.json({message:"this is a home route"}));

//using user's router
app.use('/backend/course',courseRouter);

mongoose.connect(
    "mongodb+srv://abhishek002684:Abhi%401204@cluster0.dohre.mongodb.net/",{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName:"CampusConnect"
    }
).then(()=>console.log("MongoDb Connected Successfully ...!")).catch((err)=>
console.log(err));


app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
});

