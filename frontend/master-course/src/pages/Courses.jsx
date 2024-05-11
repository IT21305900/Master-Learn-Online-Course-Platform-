import React from "react";
import { Box } from "@mui/material";
import Nav from "../components/common/Nav";
import FetchCourse from "../components/fetch/Courses";
import SearchCourse from "../components/courses/SearchCourse";

const Courses = () => {
  return (
    <Box>
      <Nav />
      <SearchCourse />
      <FetchCourse />
    </Box>
  );
};

export default Courses;
