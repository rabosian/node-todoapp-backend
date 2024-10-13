const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = Schema(
  {
    taskName: {
      type: String,
      required: true,
    },
    isComplete: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
