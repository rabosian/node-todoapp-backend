const Task = require("../models/task");
const Comment = require("../models/comment")

const taskController = {};

taskController.createTask = async (req, res) => {
  try {
    // console.log("request: ", req.body)
    const { taskName } = req.body;
    const newTask = new Task({ taskName });
    await newTask.save();
    res.status(200).json({ status: "Success", data: newTask });
  } catch (err) {
    res.status(400).json({ status: "Failed", error: err });
  }
};

taskController.getAllTasks = async (req, res) => {
  try {
    const taskList = await Task.find({}).select("-__v");
    res.status(200).json({ status: "Success", data: taskList });
  } catch (err) {
    res.status(400).json({ status: "Failed", error: err });
  }
};

taskController.updateTaskStatus = async (req, res) => {
  try {
    const currentTask = await Task.findById(req.params.id);
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { isComplete: !currentTask.isComplete },
      { new: true }
    );
    res.status(200).json({ status: "Success", data: updatedTask });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "Failed", error: err });
  }
};

taskController.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    console.log("task found: ", task)
    await Comment.deleteMany({ _id: { $in: task.comments } });
    const removedTask = await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "Success", data: removedTask });
  } catch (err) {
    console.log(err)
    res.status(400).json({ status: "Failed", error: err });
  }
};

module.exports = taskController;
