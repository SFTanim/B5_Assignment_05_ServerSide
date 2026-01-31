import { Server } from 'http'
import mongoose from 'mongoose';
import { envVars } from './app/config/env.config';
import app from './app';
import { generateSuperAdmin } from './app/utils/generatingSuperAdmin';


let server: Server;


const startServer = async () => {
    try {
        await mongoose.connect(envVars.DB_URL)
        console.log("Connected to Database")

        server = app.listen(envVars.PORT, () => {
            console.log(`Server is listening to port: `, envVars.PORT)
        })

    } catch (error) {
        console.log("Database Server Error: ", error)
    }
}

(
    async () => {
        await startServer()
        await generateSuperAdmin()
    }
)()


const shutdown = (reason: string, error?: any) => {
    console.log(reason, error || "")

    if (server) {
        server.close(() => {
            process.exit(1)
        })
    } else {
        process.exit(1)
    }
}

process.on("SIGTERM", () => shutdown("SIGTERM: Signal Terminator detected"))
process.on("SIGINT", () => shutdown("SIGINT: Signal Manual Termicator detected"))
process.on("unhandledRejection", (err) =>
    shutdown("Unhandled Rejection detected", err)
)
process.on("uncaughtException", (err) =>
    shutdown("Uncaught Exception detected", err)
)