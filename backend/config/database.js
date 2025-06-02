const mongoose = require('mongoose');

const connectDatabase = (URI) => {
    mongoose.connect(URI)
        .then(() => {
            console.log('MongoDB connected successfully');
        })
        .catch((error) => {
            console.log('MongoDB connection error:', error);
        });
};

module.exports = connectDatabase; 