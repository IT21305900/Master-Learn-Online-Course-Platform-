import React, { useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import CourseForm from "../forms/CourseForm";
import {
  createCourse,
  fetchCourse,
  updateCourse,
} from "../../api/course.api.mjs";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Loader from "../common/Loader";

const UpdateCourse = ({ cid }) => {
  const queryClient = new QueryClient();

  const { data: course, isLoading } = useQuery({
    queryKey: ["course", cid],
    queryFn: fetchCourse,
    onSuccess: () => {},
    onError: () => {},
  });

  //form
  const [form, setForm] = useState({
    id: cid,
    title: course?.title ? course.title : "",
    description: course?.description ? course.description : "", 
    price: course?.price ? course.price : "",
    status: false,
  });

  //mutatioion
  const mutation = useMutation({
    mutationFn: updateCourse,
    onSuccess: () => {
      queryClient.invalidateQueries(["courses", "course"]);
    },
    onError: () => {},
  });

  //handle send
  const handleSend = () => {
    console.log(form);
    mutation.mutateAsync(form);
  };

  console.log(course);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box>
      <Divider sx={{ mb: 2 }} />
      <Typography sx={{ my: 2 }} variant="h4">
        {course?.title}
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <CourseForm
        type="update"
        handleSend={handleSend}
        form={form}
        setForm={setForm}
      />
    </Box>
  );
};

export default UpdateCourse;
