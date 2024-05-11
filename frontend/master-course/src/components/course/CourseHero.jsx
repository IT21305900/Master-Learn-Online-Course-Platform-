import { Button, Typography, Box } from "@mui/material";
import React from "react";
import { fetchCourse } from "../../api/course.api.mjs";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../common/Loader";
import { useQuery } from "@tanstack/react-query";

const CourseHero = () => {
  const { cid } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryFn: fetchCourse,
    queryKey: ["course", cid],
    onSuccess: () => {},
    onError: () => {},
  });

  const handleNavigate = () => {
    navigate(`/course/${cid}/lesson/${data.modules[0].lid}`);
  };

  if (isLoading) return <Loader />;

  console.log(data);

  return (
    <Box>
      <Typography variant="h1">{data?.title}</Typography>
      <Button variant="contained" onClick={handleNavigate}>
        Enroll
      </Button>
    </Box>
  );
};

export default CourseHero;
