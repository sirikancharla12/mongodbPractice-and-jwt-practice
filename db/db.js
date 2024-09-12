const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Use the connection string without the database name
const ConnectionString = process.env.MONGODB_URL;

const connectdb = async () => {
    try {
        await mongoose.connect(ConnectionString, {
            dbName: process.env.DB_NAME, 
        
        });
        console.log("DB connected");
    } catch (error) {
        console.error("Error connecting to database:", error);
        process.exit(1);
    }
};

module.exports = connectdb;
