import Course from "../model/course.model.js";
import amqp from "amqplib/callback_api.js";

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
  async createCourse(title, description, instructor, price) {
    try {
      const course = await Course.create({
        title,
        description,
        instructor,
        price,
      });

      await this.pushMessage("email", JSON.stringify(course));

      return course;
    } catch (error) {
      console.log(error);
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

  //push message
  //push message
  async pushMessage(queue, msg) {
    // Connect to your RabbitMQ server
    try {
      amqp.connect(
        "amqps://wpcunvef:Ep4fsxSOS1QkSurjVwN7tcyJi9VmNxx4@armadillo.rmq.cloudamqp.com/wpcunvef",
        function (error0, connection) {
          if (error0) {
            console.error("Failed to connect to RabbitMQ server:", error0);
            return;
          }
          // Create a channel
          connection.createChannel(function (error1, channel) {
            if (error1) {
              console.error("Failed to create a channel:", error1);
              return;
            }

            // Assert the queue into existence. This is idempotent.
            channel.assertQueue(queue, {
              durable: false,
            });

            // Send a message to the queue
            channel.sendToQueue(queue, Buffer.from(msg));

            console.log(" [x] Sent %s", msg);
          });
        }
      );
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
}

export default CourseService;
