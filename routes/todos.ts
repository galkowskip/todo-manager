import { Router } from "express"

import { GetTodos, GetTodo, CreateTodo, UpdateTodo, DeleteTodo } from "../controllers/todos"
import { TodoFiltersEntity } from "../entities/todo"

const router = Router()

router.get('/', async (req, res) => {

    const query = req.query

    const filters = {
        id: query.id as string,
        completed: query.completed as boolean | undefined,
        category: query.category as string,
        search: query.search as string,
        dateStart: query.dateStart as string,
        dateEnd: query.dateEnd as string
    } as TodoFiltersEntity

    const todos = await GetTodos(filters)
    res.send(todos)
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const todo = await GetTodo(id)
    res.send(todo)
})

router.post('/', async (req, res) => {
    const todo = req.body
    const newTodo = await CreateTodo(todo)
    res.send(newTodo)
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    const todo = req.body

    const updatedTodo = await UpdateTodo(id, todo)
    res.send(updatedTodo)
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const isDeleted = await DeleteTodo(id)
    res.send(isDeleted)
})

export default router