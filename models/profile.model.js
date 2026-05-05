const mongoose = require("mongoose")

const profileSchema = new mongoose.Schema({
    name: {
        type:String,
        required: false
    },
    regNumber:{
        type: String,
        required: false
    },
    student:{
        type: Boolean,
        default: true
    }
})

const Profile = mongoose.model("Profile", profileSchema);

module.exports  = Profile;

