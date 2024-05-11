import React from "react";
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import CourseCard from "../cards/CourseCard";
import Loader from "./Loader";
import { fetchCourse, fetchCourses } from "../../api/course.api.mjs";

const Courses = () => {
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
    <Box>
      {data?.map((course) => (
        <CourseCard course={course} />
      ))}
    </Box>
  );
};

export default Courses;
