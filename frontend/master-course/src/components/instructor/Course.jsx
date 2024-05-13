import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import FetchCourse from "../fetch/Courses";
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
        {action === undefined && <FetchCourse type="instructor" />}
      </Box>
    </Box>
  );
};

export default Course;
