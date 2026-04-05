import mongoose from 'mongoose'

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

export default Profile;

