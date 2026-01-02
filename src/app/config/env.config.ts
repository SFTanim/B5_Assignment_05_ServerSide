import dotenv from "dotenv"


dotenv.config()

interface IEnvConfigs {
    PORT: string
    DB_URL: string
    SUPER_ADMIN_EMAIL: string
    SUPER_ADMIN_PASSWORD: string
    BCRIPTJS_SALT_ROUND: string
    NODE_ENV: string
    JWT_ACCESS_SECRET : string
    JWT_ACCESS_EXPIRES : string
    JWT_REFRESH_SECRET : string
    JWT_REFRESH_EXPIRES : string
}

const loadEnvVariables = (): IEnvConfigs => {
    const requiredEnvVariables: string[] = [
        "PORT",
        "DB_URL",
        "SUPER_ADMIN_EMAIL",
        "SUPER_ADMIN_PASSWORD",
        "BCRIPTJS_SALT_ROUND",
        "NODE_ENV",
        "JWT_ACCESS_SECRET",
        "JWT_ACCESS_EXPIRES",
        "JWT_REFRESH_SECRET",
        "JWT_REFRESH_EXPIRES",
    ]

    requiredEnvVariables.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Missing required environment variable: ${key}`)
        }
    })

    return {
        PORT: process.env.PORT as string,
        DB_URL: process.env.DB_URL as string,
        SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
        SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
        BCRIPTJS_SALT_ROUND: process.env.BCRIPTJS_SALT_ROUND as string,
        NODE_ENV: process.env.NODE_ENV as string,
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
        JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
        JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES as string,
    }
}

export const envVars = loadEnvVariables()