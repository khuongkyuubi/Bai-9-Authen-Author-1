import mongoose from "mongoose";

const keywordsSchema = new mongoose.Schema({
    keyword: String
})
const keywordsModel = mongoose.model("Keyword", keywordsSchema)
export {keywordsSchema, keywordsModel};
