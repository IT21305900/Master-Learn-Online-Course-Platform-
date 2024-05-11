import React from "react";
import { Box } from "@mui/material";
import Nav from "../components/common/Nav";
import CourseList from "../components/common/Courses";

const Courses = () => {
  return (
    <Box>
      <Nav />
      <CourseList />
    </Box>
  );
};

export default Courses;
