const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    summary: { 
        type: String, 
        required: false, 
    },
    username: {
      type: String,
      required: true,
      // unique:true
    },
    cover: {
      type: String,
      required: false,
    },
    categories: {
      type: Array,
      required: false,
    },
    comments: {
      type: Array,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);
