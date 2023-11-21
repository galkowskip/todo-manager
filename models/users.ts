import '../db';

import { UserEntity } from '../entities/users';
import { User } from '../schema/users';
import { setPassword } from '../strategies/local';

export async function GetUsersModelByUsername(username: string): Promise<UserEntity> {
    try {
        const user = await User.findOne({ username: username }).exec();

        if (!user) {
            throw new Error('User not found');
        }

        const userToReturn: UserEntity = {
            _id: user.id as string,
            username: user.username as string,
            password: user.password as string,
            createdAt: user.createdAt as string,
            updatedAt: user.updatedAt as string,
        }

        return userToReturn;
    } catch (error) {
        throw error
    }
}
export async function GetUsersModelById(id: string): Promise<UserEntity> {
    try {
        const user = await User.findById(id).exec();

        if (!user) {
            throw new Error('User not found');
        }

        const userToReturn = {
            _id: user.id,
            username: user.username,
            password: user.password,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        } as UserEntity

        return userToReturn;
    } catch (error) {
        throw error
    }
}

export async function CreateUserModel(username: string, password: string): Promise<UserEntity> {
    try {
        const newUser = new User({
            username: username,
            password: setPassword(password),
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        console.log(newUser)

        const response = await newUser.save();

        return {
            _id: response.id,
            username: response.username,
            password: response.password,
            createdAt: response.createdAt,
            updatedAt: response.updatedAt,
        } as UserEntity
    }
    catch (error) {
        throw error
    }
}