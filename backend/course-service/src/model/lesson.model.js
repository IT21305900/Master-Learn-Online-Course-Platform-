import { Schema, SchemaType, model } from "mongoose";

const LessonSchema = new Schema({
  key: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const LessonModel = model("Lesson", LessonSchema);
export default LessonModel;
