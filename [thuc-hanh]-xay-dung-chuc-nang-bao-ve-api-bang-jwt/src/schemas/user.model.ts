import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type: String},
    password: {type: String}
});
const userModel = mongoose.model('User', userSchema);
export {userSchema, userModel};