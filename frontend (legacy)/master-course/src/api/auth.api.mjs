import AxiosInstance from "./AxiosInstance.mjs";

const authUser = async () => {
  const result = await AxiosInstance().get("/authenticate", {
    withCredentials: true,
  });
  return result.data;
};

const authInstructor = async () => {
  const result = await AxiosInstance().get(
    "/authenticate/authorizaion/instructor",
    {
      withCredentials: true,
    }
  );

  if (result.status === 403) {
    throw new Error("Not authorized as instructor");
  }

  return result.data;
};

const authAdmin = async () => {
  const result = await AxiosInstance().get("/authenticate/authorizaion/admin", {
    withCredentials: true,
  });
  return result.data;
};

const signUp = async (user) => {
  const result = await AxiosInstance().post("/auth/signup", user, {
    withCredentials: true,
  });
  return result.data;
};

const signIn = async (acceessToken) => {
  console.log(acceessToken);
  const result = await AxiosInstance().post(
    "/authentication/signin",
    { user: acceessToken },
    {
      withCredentials: true,
    }
  );
  return result.data;
};

const signOut = async () => {
  const result = await AxiosInstance().post("/authentication/signout", user, {
    withCredentials: true,
  });
  return result.data;
};

export { authUser, signIn, signUp, signOut, authInstructor, authAdmin };
