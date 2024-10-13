const Task = require("../model/task");

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

taskController.getTasks = async (req, res) => {
  try {
    const taskList = await Task.find({}).select("-__v");
    res.status(200).json({ status: "Success", data: taskList });
  } catch (err) {
    res.status(400).json({ status: "Failed", error: err });
  }
};

taskController.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedTask = await Task.findByIdAndUpdate(taskId, {
      isComplete: !isComplete,
    });
    res.status(200).json({ status: "Success", data: updatedTask });
  } catch (err) {
    res.status(400).json({ status: "Failed", error: err });
  }
};

taskController.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const removedTask = await Task.findByIdAndDelete(taskId);
    res.status(200).json({ status: "Success", data: removedTask });
  } catch (err) {
    res.status(400).json({ status: "Failed", error: err });
  }
};

module.exports = taskController;
