import React from "react";
import { Box } from "@mui/material";
import LessonForm from "../forms/LessonForm";
import ListLessons from "./ListLessons";
import CreateLesson from "./CreateLesson";
import { useLocation } from "react-router-dom";
import CourseData from "./CourseData";

const ManageLessons = () => {
  const location = useLocation();
  const course = new URLSearchParams(location.search).get("course");

  return (
    <>
      <CourseData course={course} />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { md: "repeat(2, 1fr)" },
          gap: 4,
        }}
      >
        <CreateLesson course={course} />
        <ListLessons course={course} />
      </Box>
    </>
  );
};

export default ManageLessons;
