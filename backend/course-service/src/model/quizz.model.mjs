import { Schema, SchemaType, model } from "mongoose";

const QuizzSchema = new Schema({
  key: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  questions: [],
});

const QuizzModel = model("Quizz", QuizzSchema);
export default QuizzModel;
