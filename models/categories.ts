// use postgress to control todos
import '../db';
import type { TodoCategoryEntity } from '../entities/todo';

import ToDoCategory from '../schema/todoCategory';

export async function GetCategoriesModel(): Promise<TodoCategoryEntity[]> {
    try {
        const response = await ToDoCategory.find({}).exec();

        if (!response) {
            return [];
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
        console.log(error)
        throw error
    }
}

export async function GetCategoryModel(id: String): Promise<TodoCategoryEntity> {
    try {
        const response = await ToDoCategory.findById(id).exec();
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
        console.log(error)
        throw error
    }
}

export async function CreateCategoryModel(category: TodoCategoryEntity): Promise<TodoCategoryEntity> {
    try {
        const newCategory = new ToDoCategory({
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
        console.log(error)
        throw error
    }
}

export async function UpdateCategoryModel(id: string, category: TodoCategoryEntity): Promise<TodoCategoryEntity> {
    try {
        const response = await ToDoCategory.findByIdAndUpdate(id, {
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
        console.log(error)
        throw error
    }
}

export async function DeleteCategoryModel(id: string): Promise<Boolean> {
    try {
        await ToDoCategory.findByIdAndDelete(id).exec();
        return true;
    } catch (error) {
        console.log(error)
        throw error
    }
}