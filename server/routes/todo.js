const express = require("express");

const router = express.Router();

const { createTodo, getTodos } = require("../controller/createTodo");
const { deleteTodo } = require("../controller/deleteTodo");
const { editTodo } = require("../controller/editTodo");
const { completeTask } = require("../controller/editTodo");
const { smsTodo } = require("../controller/smsTodo");
router.post("/createtodo", createTodo);
router.get("/gettodos", getTodos);
router.delete("/deletetodo", deleteTodo);
router.put("/updatetodo", editTodo);
router.post("/schedule-sms", smsTodo);
router.put("/completetodo", completeTask);
module.exports = router;
