import { Schema, model } from "mongoose";

const LearnerSchema = new Schema({
    userID: {
        type: String,
        unique: true,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    roles: [], // Assuming roles are an array of strings

    // Enrollment details
    enrollment: [{
        course: {
            type: String,
            },
            courseID: {
                type: String,
                },
        completionPercentage: {
            type: Number,
            default: 0,
        },
    }],
});

const Usermodel = model("Usermodel", LearnerSchema);
export default Usermodel;
