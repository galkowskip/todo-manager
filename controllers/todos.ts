import { GetTodosModel, CreateTodoModel, GetTodoModel, UpdateTodoModel, DeleteTodoModel, GetCategoryTodosModel } from '../models/todos';

const GetTodos = async (): Promise<Todo[] | []> => {
    return await GetTodosModel();
}

const GetTodo = async (id: String): Promise<Todo> => {
    return await GetTodoModel(id)
}

const GetCategoryTodos = async (category: String): Promise<Todo[] | []> => {
    return await GetCategoryTodosModel(category);


}

const CreateTodo = async (todo: Todo): Promise<Todo> => {
    return await CreateTodoModel(todo);
}

const UpdateTodo = async (id: String, todo: Todo): Promise<Todo> => {
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