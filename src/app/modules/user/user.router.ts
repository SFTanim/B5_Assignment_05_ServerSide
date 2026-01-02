import { Router } from "express";
import { UserController } from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";


const router = Router()

// All User - ADMIN
router.get("/all-user", checkAuth(Role.ADMIN), UserController.getAllUser)

// Create User - Anyone
router.post("/", UserController.createUser)

// Get Profile - Single User
router.post("/me", checkAuth(...Object.values(Role)), UserController.getMe)

// Get One User - ADMIN
router.get("/:id", checkAuth(Role.ADMIN), UserController.getSingleUser)

// Update Profile - Single User
router.patch("/:id", checkAuth(...Object.values(Role)), UserController.updateUser)


export const UserRouter = router