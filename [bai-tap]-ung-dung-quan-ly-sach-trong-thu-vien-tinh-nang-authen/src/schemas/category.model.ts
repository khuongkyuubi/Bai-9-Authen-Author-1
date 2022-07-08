const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    type: {type: String, required:true}

})
const categoryModel = mongoose.model('Category',categorySchema);

export {categorySchema, categoryModel }
