
interface Todo {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
    deadline: string;
    category: string;
}

interface TodoCategory {
    _id: string;
    name: string;
    description: string;
    color: string;
    createdAt: string;
    updatedAt: string;
    items: Todo[];
}