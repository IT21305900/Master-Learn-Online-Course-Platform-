import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CourseForm from "../forms/CourseForm";
import Courses from "../common/Courses";
import CreateCourse from "./CreateCourse";
import ManageLessons from "./ManageLessons";

const Course = () => {
  const navigate = useNavigate();
  const { action } = useParams();

  const handleClick = () => {
    navigate("/instructor/course/create");
  };

  return (
    <Box>
      {action === undefined && (
        <Box>
          <Button onClick={handleClick} variant="contained">
            Create New
          </Button>
        </Box>
      )}

      <Box>
        {action === "create" && <CreateCourse />}
        {action === "lesson" && <ManageLessons />}
        {action === undefined && <Courses type="dashboard" />}
      </Box>
    </Box>
  );
};

export default Course;
