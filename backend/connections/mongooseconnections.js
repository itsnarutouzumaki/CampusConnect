const mongoose = require('mongoose');
require('dotenv').config();
const mongouri=process.env.MONGO_URI;
mongoose.connect(mongouri, { useNewUrlParser: true, useUnifiedTopology: true,
    dbName:'campus'
 })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
    module.exports=mongoose;
