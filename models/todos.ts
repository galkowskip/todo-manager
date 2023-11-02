// use postgress to control todos
import { db } from '../db';
import { ToDo } from '../schema/todos';

const GetTodosModel = async () => {
    try {
        const todos = await ToDo.find({}).exec();

        return todos;
    } catch (error) {
        console.log(error)
        throw error
    }
}

const GetTodoModel = async (id: String) => {
    try {
        const todo = await ToDo.find({ id }).exec();
        return todo;
    } catch (error) {
        console.log(error)
        throw error
    }
}

const CreateTodoModel = async (todo: Todo) => {
    try {
        const newTodo = new ToDo({
            title: todo.title,
            description: todo.description,
            completed: todo.completed,
            createdAt: todo.createdAt,
            updatedAt: todo.updatedAt
        });

        await newTodo.save();
        return newTodo;
    } catch (error) {
        console.log(error)
        throw error
    }
}

const UpdateTodoModel = async (id: String, todo: Todo) => {
    try {
        const updatedTodo = await ToDo.findOneAndUpdate({ id }, todo, { new: true }).exec();
        return updatedTodo;
    } catch (error) {
        console.log(error)
        throw error
    }
}

const DeleteTodoModel = async (id: String) => {
    try {
        const deletedTodo = await ToDo.findOneAndDelete({ id }).exec();
        return deletedTodo;
    } catch (error) {
        console.log(error)
        throw error
    }
}

export {
    GetTodosModel,
    GetTodoModel,
    CreateTodoModel,
    UpdateTodoModel,
    DeleteTodoModel
}