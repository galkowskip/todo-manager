export interface UserEntity {
    _id: string;
    username: string;
    password: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export interface UserFilters {
    id?: string;
    username?: string;
    email?: string;
}