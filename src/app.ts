import express, { Request, Response } from "express"
import cors from 'cors'
import "./app/config/passport";
import { router } from "./app/routers"
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler"
import cookieParser from "cookie-parser"
import { envVars } from "./app/config/env.config";

const app = express()

app.use(cookieParser())
app.use(express.json())

app.use(cors({
    origin: envVars.FRONTEND_URL,
    credentials: true
}))


app.use("/api/v1", router)

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Digital Wallet Backend System Running"
    })
})

app.use(globalErrorHandler)

export default app