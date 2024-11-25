const Todo = require("../models/todomodel");

exports.editTodo = async (req, res) => {
  try {
    const { id, task, description, time, phone } = req.body;
    const todo = await Todo.findById(id);
    todo.task = task;
    todo.description = description;
    todo.time = time;
    todo.phone = phone;
    await todo.save();
    res.status(200).json({
      todo,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

exports.completeTask = async (req, res) => {
  try {
    const { id } = req.body;
    const todo = await Todo.findById(id);
    const updateTodo = await Todo.findByIdAndUpdate(
      id,
      { done: !todo.done },
      { new: true }
    );

    res.status(200).json({
      updateTodo,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};
