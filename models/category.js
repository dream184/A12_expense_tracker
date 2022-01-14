const mongoose = require('mongoose')
const Schema = mongoose.Schema
const categorySchema = new Schema({
  categoryId: {
    type: Number,
    require: true
  },
  name: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('Category', categorySchema)