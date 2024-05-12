import AuthService from "../service/auth.service.js";

const authService = new AuthService();

const signIn = async (req, res, next) => {
  try {
    const { user } = req.body;

    let existUser = await authService.getUser(user.id);

    if (!existUser) {
      console.log("called");
      existUser = await authService.createUser(user.id, user.email);
    }

    // Generate token
    const token = await authService.generateUserToken(existUser);

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
      })
      .json({ message: "User signed successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (authService.getUser(username) || authService.getUser(email)) {
      return res.status(409).json({ message: "Credentials Invalid" });
    }

    const user = authService.createUser(username, email, password);

    // Generate token
    const token = await authService.generateUserToken(user);

    // Send response
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
      })
      .json({ message: "User created successfully", user });
  } catch (error) {
    next(error);
  }
};

const signOut = async (req, res, next) => {
  try {
    // Clear the cookie
    res.clearCookie("token");

    // Send response
    res.status(200).json({ message: "User signed out successfully." });
  } catch (error) {
    next(error);
  }
};

export { signIn, signUp, signOut };
