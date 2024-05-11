import React from "react";
import { Box } from "@mui/material";
import LessonForm from "../forms/LessonForm";
import ListLessons from "./ListLessons";
import CreateLesson from "./CreateLesson";

const ManageLessons = () => {
  return (
    <Box>
      <CreateLesson />
      <ListLessons />
    </Box>
  );
};

export default ManageLessons;
