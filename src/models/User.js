import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    hasProfile: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

UserSchema.virtual('fullName').get(() => this.firstname + ' ' + this.lastname );

const User = mongoose.model('users', UserSchema);

module.exports = User;
