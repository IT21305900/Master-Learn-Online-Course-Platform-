import { Schema, SchemaType, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const CourseSchema = new Schema({
  key: {
    type: String,
    default: () => uuidv4(),
    immutable: true
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  modules: [],
  price: {
    type: Number,
    required: true,
  },
  instructor: {
    type: String,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

const CourseModel = model("Course", CourseSchema);
export default CourseModel;
