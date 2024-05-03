const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect("mongodb+srv://movinduliyanage:test1234@cluster0.fs7litn.mongodb.net/RelicRoom?retryWrites=true&w=majority&appName=Cluster0");
    console.log("DB Connection Successful..");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
