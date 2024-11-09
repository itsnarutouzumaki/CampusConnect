const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 1000;


const studentRoutes = require('./Route/Student');
const authRoutes = require('./Route/authroutes');
const teacherRoutes = require('./Route/teacherroutes');
const courseRouter = require('./Route/Course');
const assignmentRouter = require('./Route/Assignment');
const chapterRouter=require('./Route/Chapter');
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// Test route
app.get('/', (req, res) => res.json({ message: "This is the home route" }));

// backend routes
app.use('/backend/auth', authRoutes);
app.use('/backend/studentRoutes', studentRoutes);
app.use('/backend/teacherRoutes', teacherRoutes);
app.use('/backend/course', courseRouter);
app.use('/backend/assignment', assignmentRouter);
app.use('/backend/chapter',chapterRouter);

const username = process.env.Database_UserName;
const password = process.env.Database_password;

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.dohre.mongodb.net/`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected Successfully ...!"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
