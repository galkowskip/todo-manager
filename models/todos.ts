// use postgress to control todos
import '../db';
import type { TodoEntity } from '../entities/todo';
import { ToDo } from '../schema/todos';

const GetTodosModel = async (): Promise<TodoEntity[] | []> => {
    try {
        const response = await ToDo.find({}).exec();

        if (!response) {
            return [];
        }
        const todos = response.map((todo: any) => {

            return {
                _id: todo._id as string,
                title: todo.title as string,
                description: todo.description as string,
                completed: todo.completed as boolean,
                createdAt: todo.createdAt as string,
                updatedAt: todo.updatedAt as string
            } as TodoEntity
        })

        return todos;
    } catch (error) {
        throw error
    }
}

const GetTodoModel = async (id: String): Promise<TodoEntity> => {
    try {
        const response = await ToDo.findById(id).exec();
        if (!response) {
            throw new Error('Todo not found');
        }

        const todo = {
            _id: response.id as string,
            title: response.title as string,
            description: response.description as string,
            completed: response.completed as boolean,
            createdAt: response.createdAt as string,
            updatedAt: response.updatedAt as string
        } as TodoEntity

        return todo;
    } catch (error) {
        throw error
    }
}

const CreateTodoModel = async (todo: TodoEntity): Promise<TodoEntity> => {
    try {
        const newTodo = new ToDo({
            title: todo.title,
            description: todo.description,
            completed: todo.completed,
            createdAt: todo.createdAt,
            updatedAt: todo.updatedAt,
            category: todo.category
        })

        const response = await newTodo.save();

        const createdTodo = {
            _id: response.id as string,
            title: response.title as string,
            description: response.description as string,
            completed: response.completed as boolean,
            createdAt: response.createdAt as string,
            updatedAt: response.updatedAt as string
        } as TodoEntity

        return createdTodo;
    } catch (error) {
        throw error
    }
}

const UpdateTodoModel = async (id: String, todo: TodoEntity): Promise<TodoEntity> => {
    try {
        const response = await ToDo.findByIdAndUpdate(id, todo, { new: true }).exec();

        if (!response) {
            throw new Error('Todo not found');
        }

        const updatedTodo = {
            title: response.title as string,
            description: response.description as string,
            completed: response.completed as boolean,
            createdAt: response.createdAt as string,
            updatedAt: response.updatedAt as string
        } as TodoEntity

        return updatedTodo;
    } catch (error) {
        throw error
    }
}

const DeleteTodoModel = async (id: String): Promise<Boolean> => {
    try {
        await ToDo.findByIdAndDelete(id).exec();
        return true;
    } catch (error) {
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