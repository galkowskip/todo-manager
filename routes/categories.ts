import { Router } from "express"

import { GetCategories, GetCategory, CreateCategory, UpdateCategory, DeleteCategory } from "../controllers/categories"

const router = Router()

router.get('/', async (_, res) => {
    const categories = await GetCategories()
    res.send(categories)
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const category = await GetCategory(id)
    res.send(category)
})

router.post('/', async (req, res) => {
    const category = req.body
    const newCategory = await CreateCategory(category)
    res.send(newCategory)
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    const category = req.body

    const updatedCategory = await UpdateCategory(id, category)
    res.send(updatedCategory)
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const isDeleted = await DeleteCategory(id)
    res.send(isDeleted)
})

export default router