import CourseService from "../service/course.service";

const courseService = new CourseService();

const fetchCourse = async (req, res, next) => {
  try {
    const { cid } = req.params;

    const course = await courseService.getCourse(cid);

    return res.status(200).json({ course });
  } catch (error) {
    next(error);
  }
};

const fetchCourses = async (req, res, next) => {
  try {
    const { limit } = req.query;

    const courses = await courseService.getCourses();

    return res.status(200).json({ courses });
  } catch (error) {
    next(error);
  }
};

const createCourse = async (req, res, next) => {
  try {
    const { title, description, price } = req.body;

    const course = await courseService.createCourse(title, description, price);

    return res.status(200).json({ course });
  } catch (error) {
    next(error);
  }
};

const updateCourse = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const { course } = req.body;

    await courseService.updateCourse(cid, course);

    return res.status(200).json({ message: "Course updated successfully" });
  } catch (error) {
    next(error);
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const { cid } = req.params;

    const course = await courseService.deleteCourse(cid);

    return course;
  } catch (error) {
    next(error);
  }
};

export { fetchCourse, fetchCourses, createCourse, updateCourse, deleteCourse };
