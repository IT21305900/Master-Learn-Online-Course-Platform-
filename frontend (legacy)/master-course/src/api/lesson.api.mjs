import AxiosInstance from "./AxiosInstance.mjs";

const fetchLesson = async ({ queryKey }) => {
  const result = await AxiosInstance().get(`/lesson/${queryKey[1]}`, {
    withCredentials: true,
  });

  return result.data;
};

const fetchLessons = async ({ queryKey }) => {
  const result = await AxiosInstance().post("/lesson", {
    withCredentials: true,
  });

  return result.data;
};

const createLesson = async (lesson) => {
  const result = await AxiosInstance().post("/lesson", lesson, {
    withCredentials: true,
  });

  return result.data;
};

const updateLesson = async (course) => {
  const result = await AxiosInstance().put(`/lesson/${course?.id}`, course, {
    withCredentials: true,
  });

  return result.data;
};

const deleteLesson = async (course) => {
  const result = await AxiosInstance().delete(`/lesson/${course?.id}`, course, {
    withCredentials: true,
  });

  return result.data;
};

export { fetchLesson, fetchLessons, createLesson, updateLesson, deleteLesson };
