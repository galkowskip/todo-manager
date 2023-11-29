import '../db';

import { UserEntity, UserFilters } from '../entities/users';
import { User } from '../schema/users';
import { setPassword } from '../strategies/local';

export async function GetAllUsers(): Promise<UserEntity[]> {
    try {
        const users = await User.find({}).exec();

        if (!users) {
            throw new Error('Users not found');
        }

        const usersToReturn = users.map((user: any) => {
            return {
                _id: user.id as string,
                username: user.username as string,
                password: user.password as string,
                createdAt: user.createdAt as string,
                updatedAt: user.updatedAt as string,
            } as UserEntity
        })

        return usersToReturn;
    } catch (error) {
        throw error
    }
}

export async function GetUsersModel(userFilters: UserFilters): Promise<UserEntity | Boolean> {
    try {
        let findQuery = {} as any;

        if (userFilters.username) {
            findQuery.username = userFilters.username;
        }

        if (userFilters.email) {
            findQuery.email = userFilters.email;
        }

        const user = await User.findOne(userFilters).exec();

        if (!user) {
            return false
        }

        const userToReturn: UserEntity = {
            _id: user.id as string,
            username: user.username as string,
            email: user.email as string,
            password: user.password as string,
            createdAt: user.createdAt as string,
            updatedAt: user.updatedAt as string,
        }

        return userToReturn;
    } catch (error) {
        throw error
    }
}
export async function GetUsersModelById(id: string): Promise<UserEntity | Boolean> {
    try {
        const user = await User.findById(id).exec();

        if (!user) {
            return false
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

export async function CreateUserModel(username: string, password: string, email: string): Promise<UserEntity> {
    try {
        const newUser = new User({
            username: username,
            password: setPassword(password),
            email: email,
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString(),
        });


        const response = await newUser.save();

        return {
            _id: response.id as string,
            username: response.username as string,
            email: response.email as string,
            password: response.password as string,
            createdAt: response.createdAt as string,
            updatedAt: response.updatedAt as string,
        } as UserEntity
    }
    catch (error) {
        throw error
    }
}