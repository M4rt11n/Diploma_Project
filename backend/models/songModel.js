const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const songSchema = new Schema(
  {
    songTitle: {
      type: Array,
      required: true,
    },
    songKey: {
      type: String,
      required: true,
    },
    songBPM: {
      type: String,
      required: true,
    },
    songOriginalKey: {
      type: String,
    },
    songAuthor: {
      type: String,
      required: true,
    },
    songTranslator: {
      type: String,
      required: true,
    },
    songData: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Song", songSchema);
