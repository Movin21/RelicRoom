const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    expertId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vintageExpert",
    },
    blogtitle: {
      type: String,
      required: true,
    },
    blogcontent: {
      type: String,
      required: true,
    },
  },
  
);
module.exports = mongoose.model("blogs", blogSchema);
