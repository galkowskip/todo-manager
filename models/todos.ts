import '../db';

import type { TodoEntity, TodoFiltersEntity } from '../entities/todo';
import { ToDo } from '../schema/todos';

import { AddTodoToCategoryModel, RemoveTodoFromCategoryModel } from './categories';

const GetTodosModel = async (filters: TodoFiltersEntity): Promise<TodoEntity[] | []> => {
    try {

        let findQuery = {} as any

        if (filters.id) {
            findQuery = { ...findQuery, _id: filters.id }
        }
        if (filters.completed) {
            findQuery = { ...findQuery, completed: filters.completed }
        }
        if (filters.category) {
            findQuery = { ...findQuery, category: filters.category }
        }
        if (filters.search) {
            findQuery = { ...findQuery, title: { $regex: filters.search, $options: 'i' } }
        }
        if (filters.dateStart && filters.dateEnd) {
            findQuery = {
                ...findQuery,
                createdAt: {
                    $gte: filters.dateStart,
                    $lte: filters.dateEnd
                }
            }
        }

        const response = (await ToDo.find(findQuery, null, filters.sortBy ? {
            sort: {
                [filters.sortBy]: filters.sortDir ? 1 : -1
            }
        } : {}).exec());

        if (!response) {
            return [];
        }
        const todos = response.map((todo: any) => {

            return {
                _id: todo._id as string,
                title: todo.title as string,
                description: todo.description as string,
                deadline: todo.deadline as string,
                completed: todo.completed as boolean,
                createdAt: todo.createdAt as string,
                updatedAt: todo.updatedAt as string,
                category: todo.category as string
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
            deadline: response.deadline as string,
            completed: response.completed as boolean,
            createdAt: response.createdAt as string,
            updatedAt: response.updatedAt as string,
            category: response.category as string
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
            deadline: todo.deadline,
            completed: todo.completed,
            createdAt: todo.createdAt,
            updatedAt: todo.updatedAt,
            category: todo.category
        })

        const response = await newTodo.save();

        if (newTodo.category) {
            await AddTodoToCategoryModel(newTodo.category);
        }

        const createdTodo = {
            _id: response.id as string,
            title: response.title as string,
            description: response.description as string,
            deadline: response.deadline as string,
            completed: response.completed as boolean,
            createdAt: response.createdAt as string,
            updatedAt: response.updatedAt as string,
            category: response.category as string
        } as TodoEntity

        return createdTodo;
    } catch (error) {
        throw error
    }
}

const UpdateTodoModel = async (id: String, todo: TodoEntity): Promise<TodoEntity> => {
    try {
        const response = await ToDo.findByIdAndUpdate(id, todo, { new: false }).exec()

        if (!response) {
            throw new Error('Todo not found');
        }

        const updatedTodo = {
            title: response.title as string,
            description: response.description as string,
            deadline: response.deadline as string,
            completed: response.completed as boolean,
            createdAt: response.createdAt as string,
            updatedAt: response.updatedAt as string,
            category: response.category as string
        } as TodoEntity

        if (todo.category !== updatedTodo.category) {
            await AddTodoToCategoryModel(todo.category);
            await RemoveTodoFromCategoryModel(updatedTodo.category);
        }

        return updatedTodo;
    } catch (error) {
        throw error
    }
}

const DeleteTodoModel = async (id: string): Promise<Boolean> => {
    try {
        const deletedTodo = await ToDo.findByIdAndDelete(id).exec() as any;

        if (typeof deletedTodo.category === 'string') {
            console.log(deletedTodo.category)
            await RemoveTodoFromCategoryModel(deletedTodo.category);
        }

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