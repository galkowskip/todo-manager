import { Passport } from "passport";
import localStrategy from "./strategies/local";


const passport = new Passport();
passport.use(localStrategy);

export default passport;