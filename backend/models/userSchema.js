const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type:String,
    required:true,
    validate:{
        validator:function(v){
            let regExp =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
            return regExp.test(v)
        },
        message: props => `${props.value} is not a valid email ID!`
    }
},
  password: String,
});

const userDetails = mongoose.model("users", userSchema);

module.exports = userDetails;
