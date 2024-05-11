import AxiosInstance from "./AxiosInstance.mjs";

const fetchCourse = async ({ queryKey }) => {
  const result = await AxiosInstance().get(`/course/${queryKey[1]}`, {
    withCredentials: true,
  });

  return result.data;
};

const fetchCourses = async () => {
  console.log("Called");
  const result = await AxiosInstance().get("/course", {
    withCredentials: true,
  });

  return result.data;
};

const createCourse = async (course) => {
  const result = await AxiosInstance().post("/course", course, {
    withCredentials: true,
  });

  return result.data;
};

const updateCourse = async (course) => {
  const result = await AxiosInstance().put(`/course/${course?.id}`, course, {
    withCredentials: true,
  });

  return result.data;
};

const deletCourse = async (course) => {
  const result = await AxiosInstance().delete(`/course/${course?.id}`, course, {
    withCredentials: true,
  });

  return result.data;
};

export { fetchCourse, fetchCourses, createCourse, updateCourse, deletCourse };
