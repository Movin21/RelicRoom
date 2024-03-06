const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("DB Connection Successful..");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
