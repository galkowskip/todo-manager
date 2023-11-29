import { Strategy as LocalStrategy } from 'passport-local';
import { GetUsersModel } from '../models/users';

import crypto from 'crypto';
import { UserEntity } from '../entities/users';

const salt = process.env.SALT || 'salt';

export const setPassword = function (password: string): string {
    const buffer = crypto.pbkdf2Sync(password, salt,
        1000, 64, `sha512`).toString(`hex`);

    return buffer
}

export const validatePassword = function (password: string, savedPassword: string) {
    const hash = crypto.pbkdf2Sync(password,
        salt, 1000, 64, `sha512`).toString(`hex`);
    return savedPassword === hash;
}

const localStrategy = new LocalStrategy(
    async function (username: string, password: string, done: Function) {
        try {
            const user = await GetUsersModel({ username })
            if (typeof user === 'boolean') {
                return done(null, false, { message: 'User not found.' });
            }

            const userE = user as UserEntity;

            if (!userE || userE === null || !userE.password) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (validatePassword(password, userE.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Incorrect password.' });
            }
        } catch (error) {
            return done(error)
        }

    }
)

export default localStrategy;