const mongoose = require("mongoose");

var User = mongoose.model("User",{
    name : {type : String },
    username : { type : String },
    mailId : {type : String },
    password : { type : String },
    cartItem : {type : Array},
    orders : { type: Array },
    address: {
        addr1: String,
        addr2: String,
        city: String,
        state: String,
        country: String,
        postalCode: String
      },
      created: { type: Date, default: Date.now },
});

module.exports = { User };