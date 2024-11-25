const Task = require("../models/todomodel");

exports.createTodo = async (req, res) => {
  try {
    const { task, description, time, phone, createdAt } = req.body;
    const newTask = await Task.create({
      task: task,
      description: description || "No Description Provided",
      time: time,
      phone: phone,
      createdAt: createdAt,
    });
    res.status(201).json({
      status: "success",
      data: newTask,
      message: "Task created successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getTodos = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json({
      status: "success",
      tasks,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
