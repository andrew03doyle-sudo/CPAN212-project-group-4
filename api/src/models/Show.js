
import mongoose from "mongoose";

const showSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100
  },
  genre: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 50
  },
  seasons: {
    type: Number,
    required: true,
    min: 1,
    max: 100
  }
});

const Show = mongoose.model("Show", showSchema);

export default Show;
