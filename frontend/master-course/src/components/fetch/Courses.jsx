import React from "react";
import { Box, Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import CourseCard from "../cards/CourseCard";
import Loader from "../common/Loader";
import { fetchCourse, fetchCourses } from "../../api/course.api.mjs";

const Courses = ({ type }) => {
  const { data, isLoading } = useQuery({
    queryFn: fetchCourses,
    queryKey: ["courses"],
    onSuccess: () => {},
    onError: () => {},
  });

  if (isLoading) {
    return <Loader />;
  }

  console.log(data);

  //   const courses = data?.map((course) => <CourseCard course={course} />);

  return (
    <Box
      sx={{
        display: "grid",
        p: { xs: 2, md: 4 },
        gridTemplateColumns: {
          md: "repeat(2,1fr)",
          lg: "repeat(3,1fr)",
        },
        gap: 2,
      }}
    >
      {data?.map((course) => (
        <CourseCard type={type} course={course} />
      ))}
    </Box>
  );
};

export default Courses;
