const mongoose = require("mongoose");

const VintageExpertSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    secondname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    expertisecategoryarea: {
      type: String,
      required: true,
    },
    workingexperience: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default:"Vintage Expert",
    },
   
  },

  
);


const vintageExpert = mongoose.model("vintageExpert", VintageExpertSchema);
module.exports = vintageExpert;
