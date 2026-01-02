import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { UserService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status-codes';
import { JwtPayload } from "jsonwebtoken";
import { IUser } from "./user.interface";



const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body
    const result = await UserService.createUser(payload)

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User created successfully",
        data: result
    })
})


const getAllUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserService.getAllUser()

    sendResponse(res, {
        statusCode: httpStatus.ACCEPTED,
        success: true,
        message: "All Users successfully received",
        data: result.data,
        meta: result.meta
    })
})


const getSingleUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id as string
    const result = await UserService.getSingleUser(id)

    sendResponse(res, {
        statusCode: httpStatus.ACCEPTED,
        success: true,
        message: "User data successfully received",
        data: result.data,
    })
})


const getMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload
    const result = await UserService.getMe(decodedToken.userId)

    sendResponse(res, {
        statusCode: httpStatus.ACCEPTED,
        success: true,
        message: "User Profile data successfully received",
        data: result.data,
    })
})



const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id as string
    const payload: IUser = {
        ...req.body
    }
    const verifiedToken = req.user
    const result = await UserService.updateUser(userId, payload, verifiedToken)

    sendResponse(res, {
        statusCode: httpStatus.ACCEPTED,
        success: true,
        message: "User Profile data successfully received",
        data: null,
    })
})


export const UserController = {
    createUser,
    getAllUser,
    getSingleUser,
    getMe,
    updateUser,
}