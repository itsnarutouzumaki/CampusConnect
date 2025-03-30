const express=require('express');
const app=express();
require('dotenv').config();
const morgan=require('morgan');
const bodyParser=require('body-parser');
const cors=require('cors');
const port = process.env.PORT || 8000;
const routes=require('./routes/index.js');
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); // Add this line to parse URL-encoded data
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
app.use('/api/',routes);