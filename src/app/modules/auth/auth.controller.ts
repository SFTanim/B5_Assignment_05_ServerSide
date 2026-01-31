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
            return next(new AppError(401, err))
        }

        if (!user) {
            return next(new AppError(401, info.message))

        }

        const userTokens = createUserToken(user)

        const userObj = user.toObject()
        delete userObj.password;

        setCookies(res, userTokens)

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
    })(req, res, next)


})

const userLogout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User logged out successfully",
        data: undefined
    })
})

export const AuthController = {
    credentialLoginViaPassport,
    userLogout
}