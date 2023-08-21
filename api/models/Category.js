const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      // 'Life'
    },
    title: {
      type: String,
      required: true,
      // 'Stay Calm And Surf'
    },
    cover: {
      type: String,
      required: false,
      // '../images/category/ca1.png'
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', CategorySchema);
