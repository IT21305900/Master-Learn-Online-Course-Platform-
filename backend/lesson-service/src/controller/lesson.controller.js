import LessonService from "../service/lesson.service.js";

const lessonService = new LessonService();

const fetchLesson = async (req, res, next) => {
  try {
    const { lid } = req.params;

    const lesson = await lessonService.getLesson(lid);

    return res.status(200).json(lesson);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const fetchLessons = async (req, res, next) => {
  try {
    //no longer needed
  } catch (error) {
    next(error);
  }
};

const createLesson = async (req, res, next) => {
  try {
    const { title, content, cid } = req.body;

    await lessonService.addToCourse(cid, title, content);

    return res.status(200).json({ message: "lesson created successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateLesson = async (req, res, next) => {
  try {
    const { lesson } = req.params;

    await lessonService.updateLesson(lesson);

    return res.status(200).json({ message: "Lesson updated successfully" });
  } catch (error) {
    next(error);
  }
};

const deleteLesson = async (req, res, next) => {
  try {
    const { lid } = req.query;

    await lessonService.deleteLesson();
  } catch (error) {
    next(error);
  }
};

export { fetchLesson, fetchLessons, createLesson, updateLesson, deleteLesson };
