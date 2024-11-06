const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentroutes');
const authRoutes = require('./routes/authroutes');
const teacherRoutes = require('./Routes/teacherroutes'); // Import teacher routes
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/studentRoutes', studentRoutes);
app.use('/api/teacherRoutes', teacherRoutes); // Add teacherRoutes here

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
