const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
  },
  description: {
    type: String,
    default: "No Description Provided",
  },
  time: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  done: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: String,
    default: () => format(new Date(), "hh:mm:ss"),
  },
});

module.exports = mongoose.model("Task", todoSchema);
