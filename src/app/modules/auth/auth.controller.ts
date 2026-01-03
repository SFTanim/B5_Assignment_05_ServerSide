import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from 'http-status-codes';
import passport from "passport";
import AppError from "../../errorHelpers/appError";
import { createUserToken } from "../../utils/userTokens";
import { setCookies } from "../../utils/setCookies";



const credentialLoginViaPassport = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    passport.authenticate("local", async (err: any, user: any, info: any) => {
        if (err) {
            return next(new AppError(httpStatus.BAD_REQUEST, err))
        }
        if (!user) {
            return next(new AppError(httpStatus.BAD_REQUEST, info.message))
        }

        const userTokens = createUserToken(user)
        setCookies(res, userTokens)
        
        const userObj = user.toObject()
        delete userObj.password;

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "User logged in successfully",
            data: {
                accessToken: userTokens.accessToken,
                refreshToken: userTokens.refreshToken,
                user: userObj
            }
        })
    })


})


export const AuthController = {
    credentialLoginViaPassport,
}