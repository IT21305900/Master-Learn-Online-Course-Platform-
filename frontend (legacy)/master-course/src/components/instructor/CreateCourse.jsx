import React, { useState } from "react";
import { Box } from "@mui/material";
import CourseForm from "../forms/CourseForm";
import { createCourse } from "../../api/course.api.mjs";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

const CreateCourse = () => {
  const queryClient = new QueryClient();

  //form
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    status: false,
  });

  //mutatioion
  const mutation = useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      queryClient.invalidateQueries(["courses"]);
    },
    onError: () => {},
  });

  //handle send
  const handleSend = () => {
    console.log(form);
    mutation.mutateAsync(form);
  };

  return (
    <Box>
      <CourseForm handleSend={handleSend} form={form} setForm={setForm} />
    </Box>
  );
};

export default CreateCourse;
