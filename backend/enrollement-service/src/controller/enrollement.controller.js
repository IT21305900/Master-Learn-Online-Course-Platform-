import Usermodel from '../model/Usermodel.js';

// Create a learner
export const createLearner = async (req, res, next) => {
    try {
        const { username, userID,email, password, roles, enrollment } = req.body;
        const newLearner = new Usermodel({
            username,
            userID,
            email,
            password,
            roles,
            enrollment
        });
        const savedLearner = await newLearner.save();
        res.status(201).json({ message: "Learner created successfully", learner: savedLearner });
    } catch (error) {
        next(error);
        console.error(error);
    }
};

// Get all learners
export const getAllEnrolledCourses = async (req, res, next) => {
    try {
        const learners = await Usermodel.find();
        res.status(200).json({ learners });
    } catch (error) {
        next(error);
        console.error(error);
    }
};

// Update a learner
export const updateLearner = async (req, res, next) => {
    try {
        const { email } = req.params;
        const updatedData = req.body;
        
        // Constructing the filter object to find the learner by email
        const filter = { email: email };

        // Using the filter object as the first parameter in findOneAndUpdate()
        const updatedLearner = await Usermodel.findOneAndUpdate(filter, updatedData, { new: true });

        if (!updatedLearner) {
            return res.status(404).json({ message: "Learner not found" });
        }

        res.status(200).json({ message: "Learner updated successfully", learner: updatedLearner });
    } catch (error) {
        next(error);
        console.error(error);
    }
};

// Delete a learner
export const deleteLearner = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedLearner = await Usermodel.findByIdAndDelete(id);
        if (!deletedLearner) {
            return res.status(404).json({ message: "Learner not found" });
        }
        res.status(200).json({ message: "Learner deleted successfully" });
    } catch (error) {
        next(error);
        console.error(error);
    }
};