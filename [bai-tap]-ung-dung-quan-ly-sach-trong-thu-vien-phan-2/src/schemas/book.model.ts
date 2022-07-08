import {Schema, model} from "mongoose";

const {publisherSchema} = require("./publisher.model");
const {categorySchema} = require("./category.model");
import {keywordsSchema} from "./keyword.model"


const bookSchema = new Schema({
    title: String,
    author: String,
    category: {type: Schema.Types.ObjectId, ref: "Category"}, // nomarlziled references , type: Schema, ref den collection Category
    publisher: {type: Schema.Types.ObjectId, ref: "Publisher"}, // nomarlziled references , type: Schema, ref den collection Publisher
    keywords: [keywordsSchema],
})

const bookModel = model('Book', bookSchema);

export {bookModel};