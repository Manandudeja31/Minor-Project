const Todo = require("../models/todomodel");

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.body;
    const updatedTodo = await Todo.findByIdAndDelete({ _id: id });
    res.json(updatedTodo);
  } catch (err) {
    console.log(err);
  }
};
