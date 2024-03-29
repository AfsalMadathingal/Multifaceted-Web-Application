const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({

    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    shortDescription: {
        type: String,
        required: true
    },
    tags:{
        type:Array,
        required:true
    },
    views:{
        type:Number,
        default:0
    },
    comments:{
        type:Array,
        default:[]
    }


})


module.exports = mongoose.model("Blog", blogSchema)