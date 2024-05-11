import React from "react";
import { Box } from "@mui/material";
import Nav from "../components/common/Nav";
import FetchCourse from "../components/fetch/Courses";

const Courses = () => {
  return (
    <Box>
      <Nav />
      <FetchCourse />
    </Box>
  );
};

export default Courses;
