import bcrypt, { hashSync } from 'bcryptjs';
import { envVars } from '../config/env.config';



export const hashingPassword = async (password: string): Promise<string> => {
    const hashed = await bcrypt.hash(password, Number(envVars.BCRIPTJS_SALT_ROUND))
    return hashed
}

export const checkHashedPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    const check = await bcrypt.compare(password, hashedPassword)
    return check
}