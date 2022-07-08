import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    username: {type: String},
    password: {type: String},
    role: {type: String}
});

const userModel = mongoose.model("User", userSchema);
export default userModel;