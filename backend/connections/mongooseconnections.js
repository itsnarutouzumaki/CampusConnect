const mongoose = require('mongoose');
const mongouri=process.env.MONGO_URI;
mongoose.connect('mongodb+srv://siddarth:5xFykF8vWNXzfgIa@cluster0.dohre.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true,
    dbName:'campus'
 })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
    module.exports=mongoose;
