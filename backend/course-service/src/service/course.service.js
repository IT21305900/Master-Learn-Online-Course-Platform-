import Course from "../model/course.model.js";

class CourseService {
  constructor() {}

  //get the course
  async getCourse(cid) {
    try {
      const course = await Course.findOne({ key: cid });

      return course;
    } catch (error) {
      throw error;
    }
  }

  async getCoursesByInstructor(instructor) {
    try {
      const courses = await Course.findOne({ instructor: instructor });

      return courses;
    } catch (error) {
      throw error;
    }
  }

  //get the courses
  async getCourses(limit) {
    try {
      const courses = await Course.find();

      return courses;
    } catch (error) {
      throw error;
    }
  }

  //create a new couse
  async createCourse(title, description, price) {
    try {
      const course = await Course.create({
        title,
        description,
        price,
      });

      return course;
    } catch (error) {
      throw error;
    }
  }

  //update the course
  async updateCourse(cid, course) {
    try {
      const updatedCourse = await Course.findOneAndUpdate(
        { key: cid },
        { ...course }
      );
      return updatedCourse;
    } catch (error) {
      throw error;
    }
  }

  //delete the course
  async deleteCourse(cid) {
    try {
      const course = await Course.findOneAndDelete({ key: cid });
      return course;
    } catch (error) {
      throw error;
    }
  }
}

export default CourseService;
