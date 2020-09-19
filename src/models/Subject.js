import mongoose, { Schema } from 'mongoose';

const SubjectSchema = new Schema({
    id: {
        type: String,
        required: false,
        max: 5
    },
    name: {
       type: String,
       required: true,
       max: 50
    },
    isMajor: {
        type: String,
        required: true,
        max: 5
    },
    isMinor: {
        type: String,
        required: true,
        max: 5
    },
    isCourse: {
        type: String,
        required: true,
        max: 5
    }
});

const Subject = mongoose.model('subjects', SubjectSchema);

module.exports = Subject