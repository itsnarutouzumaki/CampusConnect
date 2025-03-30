const mongoose = require('mongoose');
const teacher = require('./teacherschema');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQispiHXs97-4Iu_SVuaCsz1THi5xcCp_Fi5eK88cJTxMQD_EGfbFGu7xA&s"
    },
    courseId:{
        type: String,
       required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    coordinator: {
       type: String,
    },
    coordinator_name: {
        type: String,
     },
    startDate: {
        type: Date
    },
    expiryDate:{
        type: Date
    },
    pdfLink:{
        type:String
    }
}, {
    timestamps: true
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
