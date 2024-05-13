const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/CompareCore");

// Check database connected or not
connect.then(() => {
    console.log("Database Connected Successfully haaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
})
.catch(() => {
    console.log("Database cannot be Connected");
})

const Loginschema = new mongoose.Schema({
    Fname: {
        type:String,
        required: true
    },
    Lname: {
        type:String,
        required: true
    },
    id: {
        type: Number,
        required:true
    },Email: {
        type:String,
        required: true
    },Password: {
        type:String,
        required: true
    }

});


// collection part
const collection = new mongoose.model("users", Loginschema);

module.exports = collection;