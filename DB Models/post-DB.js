const mongoose = require("mongoose")


// const commentSchema = new mongoose.Schema({})

const postSchema = new mongoose.Schema({
    author: {
        type:String,//Will be an ID pointing to the profile
        required: true
    },
    content:{
        type: String,
        required: true
    },
    // imageUrl:{
    //     type: String, // Optional 
    // },
    // likes: {           
    //     type:[String],
    //     default:[]
    // }
})

const Post = mongoose.model("Post", postSchema)
module.exports = Post