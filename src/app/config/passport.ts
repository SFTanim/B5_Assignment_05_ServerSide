import passport from "passport";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import { envVars } from "./env.config";
import { User } from "../modules/user/user.model";
import { IsActive, Role } from "../modules/user/user.interface";
import bcrypt from 'bcryptjs';



// For local authentication
passport.use(new LocalStrategy({ usernameField: "email", passwordField: "password" },
    async (email: string, password: string, done) => {
        try {

            const isUserExist = await User.findOne({ email })
            if (!isUserExist) {
                return done(null, false, { message: "User doesn't exist" })
            }

            if (!isUserExist.isVerified) {
                return done("User is not verified")
            }
            if (isUserExist.isActive === IsActive.BLOCKED || isUserExist.isActive === IsActive.INACTIVE) {
                return done(`User is ${isUserExist.isActive}`)
            }
            if (isUserExist.isDeleted) {
                return done("User is deleted")
            }

            const isGoogleAuthenticated = isUserExist.auths?.some(providerObject => providerObject.provider == "google")
            if (isGoogleAuthenticated && !isUserExist.password) {
                return done("It is google authenticated. Try to login using google authentication")
            }

            const isPasswordCorrect = await bcrypt.compare(password, isUserExist.password as string)
            if (!isPasswordCorrect) {
                return done(null, false, { message: "Password doesn't match. Please try again" })
            }
            const userObj = isUserExist.toObject()
            delete userObj.password;

            return done(null, userObj)
        } catch (error) {
            if (envVars.NODE_ENV === "development") {
                console.log(error)
            }
            done(error)
        }
    }
))


// For google authentication
passport.use(new GoogleStrategy(
    {
        clientID: envVars.GOOGLE.GOOGLE_CLIENT_ID,
        clientSecret: envVars.GOOGLE.GOOGLE_CLIENT_SECRET,
        callbackURL: envVars.GOOGLE.GOOGLE_CALLBACK_URL
    },
    async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
        try {
            const email = profile.emails?.[0]?.value
            if (!email) {
                return done(null, false, { message: "No email found" })
            }

            let user = await User.findOne({ email })

            if (!user) {
                user = await User.create({
                    email,
                    name: profile.displayName,
                    picture: profile.photos?.[0]?.value || "",
                    role: Role.USER,
                    isVerified: true,
                    auths: [{ provider: "google", providerId: email }]
                })
            }

            return done(null, user)
        } catch (error) {
            if (envVars.NODE_ENV === "development") {
                console.log(error)
            }
            done(error)
        }
    }
))
