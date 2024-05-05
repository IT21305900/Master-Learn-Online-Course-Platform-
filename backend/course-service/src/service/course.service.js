import Course from "../model/course.model";


class CourseService {

    constructor() {

    }

    //create a new couse
    async createCourse(title, description, price) {
        try {
            const course = await Course.create(
                {
                    title,
                    description,
                    price
                }
            )

            return course;
        } catch (error) {
            throw error
        }
    }

    //update the course
    async updateCourse(course) {
        try {
            const updatedCourse = await Course.findOneAndUpdate({ key: course.key }, { ...course })
            return updatedCourse;
        } catch (error) {
            throw error
        }
    }


    //delete the course
    async deleteCourse(id) {
        try {
            const course = await Course.findOneAndDelete({ key: id })
            return course;
        } catch (error) {
            throw error
        }
    }



}

export default CourseService