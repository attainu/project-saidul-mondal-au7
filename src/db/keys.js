import mongoose from 'mongoose';

//Db connection

mongoose.connect(process.env.MONGODB_URL_SET, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));