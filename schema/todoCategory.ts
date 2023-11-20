import mongoose from "mongoose"

const todoCategorySchema = new mongoose.Schema({
    name: String,
    description: String,
    color: String,
    createdAt: String,
    updatedAt: String,
    numberOfItems: Number,
});

const TodoCategory = mongoose.model('ToDoCategory', todoCategorySchema);


export { TodoCategory }