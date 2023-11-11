import type { TodoCategoryEntity } from "../entities/todo";

import {
    GetCategoriesModel,
    CreateCategoryModel,
    GetCategoryModel,
    UpdateCategoryModel,
    DeleteCategoryModel,
} from "../models/categories";

export async function GetCategories(): Promise<TodoCategoryEntity[]> {
    return await GetCategoriesModel()
}

export async function GetCategory(id: string): Promise<TodoCategoryEntity> {
    return await GetCategoryModel(id)
}

export async function CreateCategory(category: TodoCategoryEntity): Promise<TodoCategoryEntity> {
    return await CreateCategoryModel(category)
}

export async function UpdateCategory(id: string, category: TodoCategoryEntity): Promise<TodoCategoryEntity> {
    return await UpdateCategoryModel(id, category)
}

export async function DeleteCategory(id: string): Promise<Boolean> {
    return await DeleteCategoryModel(id)
}

