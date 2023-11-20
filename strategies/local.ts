import { Strategy as LocalStrategy } from 'passport-local';
import { GetUsersModelByUsername } from '../models/users';

import crypto from 'crypto';

const salt = crypto.randomBytes(16).toString('hex');

export const setPassword = function (password: string): string {
    return crypto.pbkdf2Sync(password, salt,
        1000, 64, `sha512`).toString(`hex`);
}

export const validatePassword = function (password: string, savedPassword: string) {
    const hash = crypto.pbkdf2Sync(password,
        salt, 1000, 64, `sha512`).toString(`hex`);
    return savedPassword === hash;
}

const localStrategy = new LocalStrategy(
    async function (username: string, password: string, done: Function) {

        try {
            const user = await GetUsersModelByUsername(username)

            if (!user || user === null || !user.password) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (validatePassword(password, user.password)) {
                return done(null, user)
            }


        } catch (error) {
            return done(error)
        }

    }
)

export default localStrategy;