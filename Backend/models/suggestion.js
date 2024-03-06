const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    Name : {
      type : String,
       required : true
  },
  Email : {
      type : String,
       required : true
  },
  IsSuggestion : {
      type : String,
      default : "Suggestion"
  },
  Suggestions : {
      type : String,
      required : true
  },
  Rate : {
      type : Number,
       required : true
  }
  
   },{ timestamps: true }
   );
  
   const SuggestionModel = mongoose.model("suggetions",UserSchema);
   module.exports= SuggestionModel;