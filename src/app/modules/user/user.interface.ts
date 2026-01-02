import { Types } from "mongoose";

export enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
    AGENT = "AGENT"
}

export interface IAuthProvider {
    provider: "google" | "credentials",
    providerId: string
}
export enum IsActive {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED"
}
export interface IUser {
    _id?: Types.ObjectId
    name: string
    email: string
    password?: string
    isVerified?: boolean
    isActive?: IsActive
    isDeleted?: boolean
    money?: number
    phone?: string
    picture?: string
    address?: string
    role?: Role
    auth?: IAuthProvider[]
    trangactionId?: Types.ObjectId[]
}