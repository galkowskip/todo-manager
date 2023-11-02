import { GetTodosModel, CreateTodoModel,GetTodoModel, UpdateTodoModel, DeleteTodoModel } from '../models/todos';

const GetTodos = async () => {
    return await GetTodosModel();
}

const GetTodo = async (id: String) => {
    return await GetTodoModel(id)
}

const CreateTodo = async (todo: Todo) => {
    return await CreateTodoModel(todo);
}

const UpdateTodo = async (id: String, todo: Todo) => {
    return await UpdateTodoModel(id, todo);
}

const DeleteTodo = async (id: String) => {
    return await DeleteTodoModel(id);
}

export {
    GetTodos,
    GetTodo,
    CreateTodo,
    UpdateTodo,
    DeleteTodo
}