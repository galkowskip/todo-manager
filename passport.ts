import { Passport } from "passport";
import localStrategy from "./strategies/local";
import { UserEntity } from "./entities/users";


const passport = new Passport();
passport.use(localStrategy);

passport.serializeUser(function (user: any, cb: Function) {
    process.nextTick(function () {
        return cb(null, {
            id: user._id,
            username: user.username,
            email: user.email
        });
    });
});

passport.deserializeUser(function (user: UserEntity, cb: Function) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

export default passport;