export interface IErrorTSources {
    path: string,
    message: string
}

export interface IErrorResponseTGeneric {
    statusCode: number,
    message: string,
    errorSources?: IErrorTSources[]
}