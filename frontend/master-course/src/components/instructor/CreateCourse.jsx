import React, { useState } from "react";
import { Box } from "@mui/material";
import CourseForm from "../forms/CourseForm";
import { createCourse } from "../../api/course.api.mjs";
import { useMutation } from "@tanstack/react-query";

const CreateCourse = () => {
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
    onSuccess: () => {},
    onError: () => {},
  });

  //handle send
  const handleSend = () => {
    console.log(form);
    mutation.mutateAsync(form);
  };

  return (
    <Box>
      <CourseForm handleSend={handleSend} setForm={setForm} />
    </Box>
  );
};

export default CreateCourse;
