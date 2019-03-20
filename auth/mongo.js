const mongoose = require('mongoose');
const readonlyURI = "mongodb://readonly:read123@ds121135.mlab.com:21135/heroku_d2q4zkk3";
module.exports = () => {
    function connect() {
        mongoose.connect(process.env.MONGODB_URI || readonlyURI, {useNewUrlParser: true},function(err) {
            if (err) {
                console.error('mongodb connection error', err);
            }
            console.log('mongodb connected');
        });
    }
    connect();
    mongoose.connection.on('disconnected', connect);
    require('../schema/users');
};
