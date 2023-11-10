import mongoose from "mongoose"
import { TodoSchema } from "./todo"

const todoCategorySchema = new mongoose.Schema({
    name: String,
    description: String,
    color: String,
    createdAt: String,
    updatedAt: String,
    items: [TodoSchema]
});

const TodoCategory = mongoose.model('ToDoCategory', todoCategorySchema);

export default TodoCategory