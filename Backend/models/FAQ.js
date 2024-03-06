const mongoose = require("mongoose");

const FAQSchema = mongoose.Schema ({
    Question : {
              type : String,
               Required : true
    },
    Answer : {
              type : String,
               Required : true
    }
},{ timestamps: true }
);

const FaqModel = mongoose.model("Faqs",FAQSchema);
module.exports=FaqModel;
