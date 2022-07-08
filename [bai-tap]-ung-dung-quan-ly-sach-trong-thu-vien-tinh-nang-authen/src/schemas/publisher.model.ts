import mongoose from "mongoose";

const publisherSchema = new mongoose.Schema({
    name: {type: String, required: true}
})
const publisherModel = mongoose.model("Publisher",publisherSchema);

export {publisherSchema, publisherModel}
