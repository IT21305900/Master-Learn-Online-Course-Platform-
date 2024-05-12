import AxiosInstance from "./AxiosInstance.mjs";

const authUser = async () => {
  const result = await AxiosInstance().get("/authenticate", {
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
  const result = await AxiosInstance().post("/auth/logout", user, {
    withCredentials: true,
  });
  return result.data;
};

export { authUser, signIn, signUp, signOut };
