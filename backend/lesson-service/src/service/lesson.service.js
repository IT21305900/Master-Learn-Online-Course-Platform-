import Course from "../model/course.model.js";
import Lesson from "../model/lesson.model.js";

class LessonService {
  constructor() {}

  //create a new couse
  async createLesson(course, title, content) {
    try {
      const lesson = await Lesson.create({
        course,
        title,
        content,
      });

      return lesson;
    } catch (error) {
      throw error;
    }
  }

  //add the lesson the course
  async addToCourse(cid, title, content) {
    try {
      const lesson = await this.createLesson(cid, title, content);

      await Course.findOneAndUpdate(
        { key: cid },
        { $addToSet: { modules: { type: "lesson", lid: lesson._id, title } } }
      );
    } catch (error) {
      throw error;
    }
  }

  //get lesson
  async getLesson(lid) {
    try {
      const lesson = await Lesson.findOne({ _id: lid });
      console.log(lesson);
      return lesson;
    } catch (error) {
      next(error);
    }
  }

  //update the course
  async updateLesson(lesson) {
    try {
      const updateLesson = await Course.findOneAndUpdate(
        { key: lesson.key },
        { ...lesson }
      );
      return updateLesson;
    } catch (error) {
      throw error;
    }
  }

  //delete a lesson
  async deleteLesson(lid) {
    try {
      const result = await Lesson.deleteOne({ _id: lid });

      if (result.deletedCount === 0) {
        throw new Error("No lesson found to delete");
      }

      await Lesson.removeFromCourse();
    } catch (error) {
      throw error;
    }
  }

  //remove the lesson from the course
  async removeFromCourse(cid, lid) {
    try {
      await Course.findOneAndUpdate(
        { key: cid },
        { $pull: { modules: { lid: lid } } }
      );
    } catch (error) {
      throw error;
    }
  }
}

export default LessonService;
