import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean,
    createdAt: String,
    updatedAt: String,
    deadline: String,
    category: String
});

const ToDo = mongoose.model('ToDo', todoSchema);

export { ToDo };