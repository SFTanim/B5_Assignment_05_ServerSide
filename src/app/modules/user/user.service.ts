import { Request, Response } from "express";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import httpStatus from 'http-status-codes';
import { checkHashedPassword, hashingPassword } from "../../utils/passwordUtils";
import AppError from "../../errorHelpers/appError";
import { JwtPayload } from "jsonwebtoken";



const createUser = async (paylaod: Partial<IUser>) => {
    const { email, password, ...rest } = paylaod
    if (!email) {
        throw new AppError(httpStatus.BAD_REQUEST, "Email Required")
    }
    const ifUserExist = await User.findOne({ email: email })

    if (ifUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User Already Exist")
    }

    if (!password) {
        throw new AppError(httpStatus.BAD_REQUEST, "Password Required")
    }

    const hashedPassword = await hashingPassword(password)
    // const checkPassword = await checkHashedPassword(password, hashedPassword)

    const authProvider: IAuthProvider = {
        provider: "credentials",
        providerId: email
    }
    const user = await User.create({
        email: email,
        password: hashedPassword,
        auth: [authProvider],
        ...rest
    })

    return user

}


const getAllUser = async () => {
    const users = await User.find({})
    const totalUser = await User.countDocuments()
    return {
        data: users,
        meta: {
            total: totalUser
        }
    }
}


const getSingleUser = async (id: string) => {
    const user = await User.findById(id).select("-password")
    return { data: user }
}

const getMe = async (id: string) => {
    const user = await User.findById(id).select("-password")
    return { data: user }
}


const updateUser = async (userId: string, payload: Partial<IUser>, decodedToken: JwtPayload) => {
    const ifUserExist = await User.findById(userId)

    if (!ifUserExist) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found")
    }

    if (decodedToken.Role !== Role.ADMIN && ifUserExist.role === Role.ADMIN) {
        throw new AppError(401, `You are not authorized`)
    }
}

export const UserService = {
    createUser,
    getAllUser,
    getSingleUser,
    getMe,
    updateUser,
}