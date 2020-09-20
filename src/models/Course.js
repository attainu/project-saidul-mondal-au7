import mongoose, { Schema } from 'mongoose';

// TODO: add payment or not

const CourseSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    number: {
       type: Number,
       required: true,
       length: 3 
    },
    name: {
        type: String,
        required: true,
        max: 50
    }, 
    courseSubject: {
        type: String,
        required: true
    }
});

const Course = mongoose.model('course', CourseSchema);

module.exports = Course