const mongoose = require("mongoose");

const FeedbackSchema = mongoose.Schema({
    Name : {
              type : String,
               required : true
    },
    Email : {
              type : String,
               required : true
    },
    IsFeedback : {
              type : String,
              default : "Feedback"
    },
    Feedback : {
              type : String,
              required : true
    },
    Rate : {
              type : Number,
               required : true
    }
},{ timestamps: true }
);

const FeedbackModel = mongoose.model("feedbacks",FeedbackSchema);
module.exports= FeedbackModel;
