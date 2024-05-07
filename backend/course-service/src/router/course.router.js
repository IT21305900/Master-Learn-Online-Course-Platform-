import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  fetchCourse,
  fetchCourses,
  updateCourse,
} from "../controller/course.controller";

const router = Router();

router.route("/").get(fetchCourses).post(createCourse);
router.route("/:cid").get(fetchCourse).put(updateCourse).delete(deleteCourse);
