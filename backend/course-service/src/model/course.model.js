import { Schema, SchemaType, model } from "mongoose";

const CourseSchema = new Schema({
    key: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    modules: [],
    price: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        default: false
    }
});

const CourseModel = model("Course", CourseSchema);
export default CourseModel;