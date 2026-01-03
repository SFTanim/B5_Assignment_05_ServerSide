import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from 'http-status-codes';
import passport from "passport";



const credentialLoginViaPassport = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    passport.authenticate("local")

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User created successfully",
        data: null
    })
})


export const AuthController = {}