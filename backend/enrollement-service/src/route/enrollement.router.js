import { Router } from "express";
import { createLearner,getAllEnrolledCourses,updateLearner } from "../controller/enrollement.controller.js";

const router = Router();

router.post("/createuser", createLearner);
router.patch("/updateuser/:email", updateLearner);
router.get("/updateuser", getAllEnrolledCourses);




export default router;
