const mongoose = require('mongoose');
const link = 'mongodb+srv://ecoaurum:Kd73Pkjwq@cluster0.xqxiilz.mongodb.net/?retryWrites=true&w=majority';

const connectDb = () => {
    return mongoose.connect(link)
        .then(() => console.log('Connect to DB is OK'));
};

module.exports = connectDb;