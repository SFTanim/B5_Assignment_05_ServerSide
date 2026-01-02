import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env.config";
import httpStatus from 'http-status-codes';
import { IErrorTSources } from "../interfaces/error.types";
import AppError from "../errorHelpers/appError";

export const globalErrorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {
    if (envVars.NODE_ENV === "development") {
        console.log("Error form Global Error Handler: ", err)
    }

    let statusCode = httpStatus.INTERNAL_SERVER_ERROR
    let message = `Someting went wrong - from global error handler !! -->> ${err}`
    let errorSources: IErrorTSources[] = []


    if (err instanceof AppError) {
        statusCode = err.statusCode
        message = err.message
    }


    res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message,
        errorSources,
        err: envVars.NODE_ENV === "development" ? err : null,
        stack: envVars.NODE_ENV === "development" ? err.stack : null
    })
}