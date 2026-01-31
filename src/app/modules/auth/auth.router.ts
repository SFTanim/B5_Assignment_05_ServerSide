import { NextFunction, Request, Response, Router } from "express";
import { AuthController } from "./auth.controller";
import passport from "passport";



const router = Router()

router.post("/login", AuthController.credentialLoginViaPassport)
router.post("/logout", AuthController.userLogout)

router.get("/googleLogin", async (req: Request, res: Response, next: NextFunction) => {
    const redirect = req.query.redirect || "/"
    passport.authenticate("google", { scope: ["profile", "email"], state: redirect as string })(req, res, next)
})




export const AuthRouter = router