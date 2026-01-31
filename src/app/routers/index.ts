import { Router } from "express";
import { UserRouter } from "../modules/user/user.router";
import { AuthRouter } from "../modules/auth/auth.router";



const moduleRoutes = [
    {
        path: '/user',
        route: UserRouter
    },
    {
        path: '/auth',
        route: AuthRouter
    },
]


export const router = Router()


moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
})



