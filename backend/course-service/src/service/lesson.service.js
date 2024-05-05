import Course from "../model/course.model";
import Lesson from "../model/lesson.model";


class LessonService {

    constructor() {

    }

    //create a new couse
    async createLesson(title, content) {
        try {
            const lesson = await Lesson.create(
                {
                    title,
                    content
                }
            )

            return lesson;
        } catch (error) {
            throw error
        }
    }

    //add the lesson the course
    async addToCourse(cid, title, content) {
        try {
            const lesson = await this.createLesson(title, content);

            await Course.findOneAndUpdate(
                { key: cid },
                { $addToSet: { modules: { type: 'lesson', lid: lesson._id } } }
            );
        } catch (error) {
            throw error;
        }
    }

    //update the course
    async updateLesson(lesson) {
        try {
            const updateLesson = await Course.findOneAndUpdate({ key: lesson.key }, { ...lesson })
            return updateLesson;
        } catch (error) {
            throw error
        }
    }


    //delete a lesson
    async deleteLesson(lid) {
        try {
            const result = await Lesson.deleteOne({ _id: lid });

            if (result.deletedCount === 0) {
                throw new Error('No lesson found to delete');
            }
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

export default LessonService