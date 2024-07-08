const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://vishal13:vishal@gofood.bcx98y2.mongodb.net/gofoodmern";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectToMongo;
