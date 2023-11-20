import { UserEntity } from "../entities/users";
import { CreateUserModel } from "../models/users";

export async function createUser(username: string, password: string): Promise<UserEntity> {
    return await CreateUserModel(username, password);
}