import type { TodoEntity, TodoFiltersEntity } from '../entities/todo';

import { GetTodosModel, CreateTodoModel, GetTodoModel, UpdateTodoModel, DeleteTodoModel, } from '../models/todos';

const GetTodos = async (filters: TodoFiltersEntity): Promise<TodoEntity[] | []> => {
    return await GetTodosModel(filters);
}

const GetTodo = async (id: string): Promise<TodoEntity> => {
    return await GetTodoModel(id)
}

const CreateTodo = async (todo: TodoEntity): Promise<TodoEntity> => {
    return await CreateTodoModel(todo);
}

const UpdateTodo = async (id: string, todo: TodoEntity): Promise<TodoEntity> => {
    return await UpdateTodoModel(id, todo);
}

const DeleteTodo = async (id: string): Promise<Boolean> => {
    return await DeleteTodoModel(id);
}

export {
    GetTodos,
    GetTodo,
    CreateTodo,
    UpdateTodo,
    DeleteTodo
}