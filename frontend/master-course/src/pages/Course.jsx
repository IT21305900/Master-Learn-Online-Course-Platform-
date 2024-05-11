import { Typography, Box, Container } from "@mui/material";
import React from "react";
import Nav from "../components/common/Nav";
import CourseHero from "../components/course/CourseHero";

const Course = () => {
  return (
    <Box>
      <Nav />

      <Box sx={{ mx: { xs: 2, md: 4, lg: 6, xl: 10 } }}>
        <CourseHero />
      </Box>
    </Box>
  );
};

export default Course;
