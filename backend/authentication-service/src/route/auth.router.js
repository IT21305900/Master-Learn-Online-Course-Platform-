import { Router } from "express";
import { signIn, signUp, signOut } from "../controller/auth.controller.js";
import authenticate from "../middleware/authenticate.mjs";

const router = Router();

router.post("/signin", signIn);
router.post("/signup", signUp);
router.post("/signout", signOut);

router.get("/authorizaion/admin", authenticate, (req, res, next) => {
  const user = req.user;

  if (!user.roles.includes("admin")) {
    return res.status(403).json({ message: "No authority access" });
  }

  res.status(200);
});

router.get("/authorizaion/instructor", authenticate, (req, res, next) => {
  const user = req.user;

  if (!user.roles.includes("instructor")) {
    return res.status(403).json({ message: "No authority access" });
  }

  res.status(200);
});

export default router;
