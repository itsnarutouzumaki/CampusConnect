const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentroutes');
const authRoutes = require('./Routes/authroutes')
const cors = require('cors'); // Ensure 'cors' has 'const' here

dotenv.config();
connectDB();

const app = express();
app.use(
    express.urlencoded({ extended: true })
);
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/studentRoutes', studentRoutes); // Add studentRoutes here

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
