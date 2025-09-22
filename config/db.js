const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOOES_URL_DEV , {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected Successfully..." );
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  } 
};

module.exports = connectDB;