// use postgress to control todos
import { GetTodos, UpdateTodo } from '../controllers/todos';
import '../db';
import type { TodoCategoryEntity, TodoEntity } from '../entities/todo';

import { TodoCategory } from '../schema/todoCategory';

export async function GetCategoriesModel(): Promise<TodoCategoryEntity[] | Error> {
    try {
        const response = await TodoCategory.find({}).exec()

        if (!response) {
            throw new Error('Category not found');
        }

        const categories = response.map((category: any) => {
            return {
                _id: category._id as string,
                name: category.name as string,
                description: category.description as string,
                color: category.color as string,
                createdAt: category.createdAt as string,
                updatedAt: category.updatedAt as string,
                numberOfItems: category.numberOfItems as number,
            } as TodoCategoryEntity
        })

        return categories;
    } catch (error) {

        return error as Error
    }
}

export async function GetCategoryModel(id: String): Promise<TodoCategoryEntity | Error> {
    try {
        const response = await TodoCategory.findById(id).exec();
        if (!response) {
            throw new Error('Category not found');
        }

        const category = {
            _id: response.id as string,
            name: response.name as string,
            description: response.description as string,
            color: response.color as string,
            createdAt: response.createdAt as string,
            updatedAt: response.updatedAt as string,
            numberOfItems: response.numberOfItems as number,
        } as TodoCategoryEntity

        return category;
    } catch (error) {
        return error as Error
    }
}

export async function AddTodoToCategoryModel(id: string): Promise<TodoCategoryEntity | Error> {
    try {
        const category = await TodoCategory.findByIdAndUpdate(id, {
            $inc: {
                numberOfItems: 1
            }
        }, { new: true }).exec();

        if (!category) {
            throw new Error('Category not found');
        }

        const updatedCategory = {
            _id: category.id as string,
            name: category.name as string,
            description: category.description as string,
            color: category.color as string,
            createdAt: category.createdAt as string,
            updatedAt: category.updatedAt as string,
            numberOfItems: category.numberOfItems as number,
        } as TodoCategoryEntity

        return updatedCategory;
    } catch (error) {
        return error as Error
    }
}

export async function RemoveTodoFromCategoryModel(id: string): Promise<TodoCategoryEntity | Error> {
    try {
        const category = await TodoCategory.findByIdAndUpdate(id, {
            $inc: {
                numberOfItems: -1
            }
        }, { new: true }).exec();

        if (!category) {
            throw new Error('Category not found');
        }

        const updatedCategory = {
            _id: category.id as string,
            name: category.name as string,
            description: category.description as string,
            color: category.color as string,
            createdAt: category.createdAt as string,
            updatedAt: category.updatedAt as string,
            numberOfItems: category.numberOfItems as number,
        } as TodoCategoryEntity

        return updatedCategory;
    } catch (error) {
        return error as Error
    }
}

export async function CreateCategoryModel(category: TodoCategoryEntity): Promise<TodoCategoryEntity | Error> {
    try {
        const newCategory = new TodoCategory({
            name: category.name,
            description: category.description,
            color: category.color,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt,
            numberOfItems: category.numberOfItems,
        });

        const response = await newCategory.save();

        const newCategoryEntity = {
            _id: response.id as string,
            name: response.name as string,
            description: response.description as string,
            color: response.color as string,
            createdAt: response.createdAt as string,
            updatedAt: response.updatedAt as string,
            numberOfItems: response.numberOfItems as number,
        } as TodoCategoryEntity

        return newCategoryEntity;
    } catch (error) {
        return error as Error
    }
}

export async function UpdateCategoryModel(id: string, category: TodoCategoryEntity): Promise<TodoCategoryEntity | Error> {
    try {
        const response = await TodoCategory.findByIdAndUpdate(id, {
            name: category.name,
            description: category.description,
            color: category.color,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt,
            numberOfItems: category.numberOfItems,
        }, { new: true }).exec();

        if (!response) {
            throw new Error('Category not found');
        }

        const updatedCategory = {
            _id: response.id as string,
            name: response.name as string,
            description: response.description as string,
            color: response.color as string,
            createdAt: response.createdAt as string,
            updatedAt: response.updatedAt as string,
            numberOfItems: response.numberOfItems as number,
        } as TodoCategoryEntity

        return updatedCategory;
    } catch (error) {
        return error as Error
    }
}

export async function DeleteCategoryModel(id: string): Promise<Boolean | Error> {
    try {

        const todos = await GetTodos({ category: id });

        todos.forEach(async (todo) => {
            await UpdateTodo(todo._id, { ...todo, category: '' })
        })

        await TodoCategory.findByIdAndDelete(id).exec();
        return true;
    } catch (error) {
        return error as Error
    }
}