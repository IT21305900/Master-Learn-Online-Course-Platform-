import { Router } from "express";
import {
  createLesson,
  deleteLesson,
  fetchLesson,
  fetchLessons,
  updateLesson,
} from "../controller/lesson.controller.js";

const router = Router();

router.route("/").get(fetchLessons).post(createLesson);
router.route("/:lid").get(fetchLesson).put(updateLesson).delete(deleteLesson);

export default router;
