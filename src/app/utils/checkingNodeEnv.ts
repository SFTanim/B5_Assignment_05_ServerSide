import { envVars } from "../config/env.config"


export const checkNodeEnv = (): boolean => {
    if (envVars.NODE_ENV === "development") {
        return true
    }
    else { return false }
}