import  Todo  from "../models/todo.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";


export const createTodo = asyncHandler(async (req, res) => {
  const { title } = req.body;
  if (!title) throw new ApiError(400, "Title required");

  const todo = await Todo.create({ title, createdBy: req.user.id });
  res.status(201).json({ success: true, data: todo });
});

export const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find({ createdBy: req.user.id }).sort("-createdAt");
  res.json({ success: true, data: todos });
});



export const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) throw new ApiError(404, "Not found");
  if (todo.createdBy.toString() !== req.user.id) throw new ApiError(403, "Unauthorized");

  const { title, isCompleted } = req.body;
  if (title !== undefined) todo.title = title;
  if (isCompleted !== undefined) todo.isCompleted = isCompleted;

  await todo.save();
  res.json({ success: true, data: todo });
});


export const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) throw new ApiError(404, "Not found");
  if (todo.createdBy.toString() !== req.user.id) throw new ApiError(403, "Unauthorized");

  await todo.deleteOne();
  res.json({ success: true, message: "Deleted" });
});