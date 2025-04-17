import CourseService from "../service/course.service.js";

const courseService = new CourseService();

const fetchCourse = async (req, res, next) => {
  try {
    const { cid } = req.params;

    const course = await courseService.getCourse(cid);

    console.log(course);

    return res.status(200).json(course);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const fetchCourseByInstructor = async (req, res, next) => {
  try {
    const { instructor } = req.params;

    const courses = await courseService.getCoursesByInstructor(instructor);

    return res.status(200).json({ courses });
  } catch (error) {
    next(error);
  }
};

const fetchCourses = async (req, res, next) => {
  try {
    const { limit } = req.query;

    const courses = await courseService.getCourses();
    console.log(courses);

    return res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

const createCourse = async (req, res, next) => {
  try {
    const { title, description, price } = req.body;
    const { user } = req.user;

    console.log(title, description, price);
    console.log(user.name);

    const course = await courseService.createCourse(
      title,
      description,
      user.name,
      Number(price)
    );

    return res.status(200).json({ course });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateCourse = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const course = req.body;

    console.log(course);

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

    return res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export { fetchCourse, fetchCourses, createCourse, updateCourse, deleteCourse };
