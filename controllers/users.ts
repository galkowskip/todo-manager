import { UserEntity } from "../entities/users";
import { CreateUserModel, GetAllUsers, GetUsersModel } from "../models/users";

export async function createUser(username: string, password: string, email: string): Promise<UserEntity> {
    const isEmailInUse = await checkIfEmailIsInUse(email);
    const isUsernameInUse = await checkIfUsernameIsInUse(username);

    if (isEmailInUse) {
        return Promise.reject(new Error('Email is already in use'));
    } else if (isUsernameInUse) {
        return Promise.reject(new Error('Username is already in use'));
    }

    return await CreateUserModel(username, password, email);
}

export async function checkIfEmailIsInUse(email: string): Promise<boolean> {
    try {
        const response = await GetUsersModel({ email });

        if (!response) {
            return false;
        }

        return true;
    } catch (error) {
        throw error
    }
}

export async function checkIfUsernameIsInUse(username: string): Promise<boolean> {
    try {
        const response = await GetUsersModel({ username });

        if (!response) {
            return false;
        }

        return true;
    } catch (error) {
        throw error;
    }
}

export async function getAllUsers(): Promise<UserEntity[]> {
    return await GetAllUsers();
}