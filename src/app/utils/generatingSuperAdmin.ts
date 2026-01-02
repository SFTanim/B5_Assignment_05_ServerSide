import { envVars } from "../config/env.config"
import { IAuthProvider, IUser, Role } from "../modules/user/user.interface"
import { User } from "../modules/user/user.model"
import { checkNodeEnv } from "./checkingNodeEnv"
import { hashingPassword } from "./passwordUtils"


export const generateSuperAdmin = async () => {
    try {
        const isAdminExist = await User.findOne({ email: envVars.SUPER_ADMIN_EMAIL })
        if (isAdminExist && checkNodeEnv()) {
            console.log("Admin Exist")
            return
        }

        const authProvider: IAuthProvider = {
            provider: "credentials",
            providerId: envVars.SUPER_ADMIN_EMAIL
        }

        const hashedPassword = await hashingPassword(envVars.SUPER_ADMIN_PASSWORD)

        const adminPayload: IUser = {
            name: "Admin",
            role: Role.ADMIN,
            email: envVars.SUPER_ADMIN_EMAIL,
            password: hashedPassword,
            isVerified: true,
            auth: [authProvider]
        }

        const admin = await User.create(adminPayload)
        if (checkNodeEnv()) {
            console.log("Super Admin Created successfully.", admin)
        }

    } catch (error) {
        console.log("Error form creating super admin: ", error)
    }
}