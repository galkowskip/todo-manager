import {Router} from "express"

import { GetTodos, GetTodo, CreateTodo, UpdateTodo, DeleteTodo } from "../controllers/todos"

const router = Router()

router.get('/', async (_, res) => {
    const todos = await GetTodos()
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
    console.log(updatedTodo)
    res.send(updatedTodo)
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const isDeleted = await DeleteTodo(id)
    res.send(isDeleted)
})

export default router