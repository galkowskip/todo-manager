import { GetTodosModel } from '../models/todos';

const GetTodos = async () => {
    await GetTodosModel();
}

const GetTodo = async (id: String) => {
    // get a todo
}

const CreateTodo = async (todo: Todo) => {
    // create a todo
}

const UpdateTodo = async (id: String, todo: Todo) => {
    // update a todo
}

const DeleteTodo = async (id: String) => {
    // delete a todo
}

export {
    GetTodos,
    GetTodo,
    CreateTodo,
    UpdateTodo,
    DeleteTodo
}