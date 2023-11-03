// use postgress to control todos
import '../db';
import { ToDo } from '../schema/todos';

const GetTodosModel = async (): Promise<Todo[] | []> => {
    try {
        const response = await ToDo.find({}).exec();

        if (!response) {
            return [];
        }
        const todos = response.map((todo) => {
            return {
                _id: todo.id as string,
                title: todo.title as string,
                description: todo.description as string,
                completed: todo.completed as boolean,
                createdAt: todo.createdAt as string,
                updatedAt: todo.updatedAt as string
            } as Todo
        })

        return todos;
    } catch (error) {
        console.log(error)
        throw error
    }
}

const GetTodoModel = async (id: String): Promise<Todo> => {
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
        } as Todo

        return todo;
    } catch (error) {
        console.log(error)
        throw error
    }
}

const CreateTodoModel = async (todo: Todo): Promise<Boolean> => {
    try {
        const newTodo = new ToDo({
            title: todo.title,
            description: todo.description,
            completed: todo.completed,
            createdAt: todo.createdAt,
            updatedAt: todo.updatedAt
        });

        await newTodo.save();
        return true;
    } catch (error) {
        console.log(error)
        throw error
    }
}

const UpdateTodoModel = async (id: String, todo: Todo): Promise<Todo> => {
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
        } as Todo

        return updatedTodo;
    } catch (error) {
        console.log(error)
        throw error
    }
}

const DeleteTodoModel = async (id: String): Promise<Boolean> => {
    try {
        await ToDo.findOneAndDelete({ id }).exec();
        return true;
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