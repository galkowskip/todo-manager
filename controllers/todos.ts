import type { TodoEntity } from '../entities/todo';

import { GetTodosModel, CreateTodoModel, GetTodoModel, UpdateTodoModel, DeleteTodoModel, } from '../models/todos';

const GetTodos = async (): Promise<TodoEntity[] | []> => {
    return await GetTodosModel();
}

const GetTodo = async (id: String): Promise<TodoEntity> => {
    return await GetTodoModel(id)
}

const CreateTodo = async (todo: TodoEntity): Promise<TodoEntity> => {
    return await CreateTodoModel(todo);
}

const UpdateTodo = async (id: String, todo: TodoEntity): Promise<TodoEntity> => {
    return await UpdateTodoModel(id, todo);
}

const DeleteTodo = async (id: String): Promise<Boolean> => {
    return await DeleteTodoModel(id);
}

export {
    GetTodos,
    GetTodo,
    CreateTodo,
    UpdateTodo,
    DeleteTodo
}