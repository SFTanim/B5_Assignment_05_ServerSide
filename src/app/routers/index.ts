import { Router } from "express";
import { UserRouter } from "../modules/user/user.router";



const moduleRoutes = [
    {
        path: '/user',
        route: UserRouter
    },
]


export const router = Router()


moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
})



