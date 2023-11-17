import { Router } from "express"

import { GetCategories, GetCategory, CreateCategory, UpdateCategory, DeleteCategory } from "../controllers/categories"

const router = Router()

router.get('/', async (_, res) => {
    const categories = await GetCategories()
    // const categories: any[] = []

    if (categories instanceof Error) {
        res.status(400).send(categories.message)
        return
    }

    res.send(categories)
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const category = await GetCategory(id)

    if (category instanceof Error) {
        res.status(400).send(category.message)
        return
    }

    res.send(category)
})

router.post('/', async (req, res) => {
    const category = req.body
    const newCategory = await CreateCategory(category)

    if (newCategory instanceof Error) {
        res.status(400).send(newCategory.message)
        return
    }

    res.send(newCategory)
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    const category = req.body

    const updatedCategory = await UpdateCategory(id, category)

    if (updatedCategory instanceof Error) {
        res.status(400).send(updatedCategory.message)
        return
    }

    res.send(updatedCategory)
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const isDeleted = await DeleteCategory(id)

    if (isDeleted instanceof Error) {
        res.status(400).send(isDeleted.message)
        return
    }

    res.send(isDeleted)
})

export default router