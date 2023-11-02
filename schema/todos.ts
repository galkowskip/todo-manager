import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean,
    createdAt: Date,
    updatedAt: Date
});

const ToDo = mongoose.model('ToDo', todoSchema);

export { ToDo };