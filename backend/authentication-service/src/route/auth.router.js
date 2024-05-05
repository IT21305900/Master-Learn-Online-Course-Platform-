import { Router } from "express";
import { signIn, signUp, signOut,  } from "../controller/auth.controller.js"

const router =  Router();

router.post("/signin", signIn);
router.post("/signup", signUp)
router.post("/signout", signOut)

export default router;