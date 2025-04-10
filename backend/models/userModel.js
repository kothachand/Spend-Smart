// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//     username : String,
//     email : String,
//     name : String,
//     password : String,
//     date:{
//         type : Date,
//         default : Date.now
//     }
// })

// mongoose.model('Users', userSchema);

// module.exports = mongoose.model('Users');


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});


module.exports = mongoose.model("User", userSchema);
