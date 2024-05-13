import { Schema, SchemaType, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const LessonSchema = new Schema({
  key: {
    type: String,
    default: () => uuidv4(),
  },
  course: {
    type: String,
    require: true,
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
