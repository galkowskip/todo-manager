
interface TodoEntity {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
    deadline: string;
    category: string;
}

interface TodoFiltersEntity {
    id?: string;
    search?: string;
    category?: string;
    completed?: boolean;
    dateStart?: string;
    dateEnd?: string;
    sortBy?: string;
    sortDir?: boolean;
}

interface TodoCategoryEntity {
    _id: string;
    name: string;
    description: string;
    color: string;
    createdAt: string;
    updatedAt: string;
    numberOfItems: number;
}

export type {
    TodoEntity,
    TodoFiltersEntity,
    TodoCategoryEntity
}
