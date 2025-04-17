const adminHandler = (req, res, next) => {
  try {
    const { user } = req.user;

    if (!user.roles.includes("admin")) {
      return res.status(403).json({ message: "No admin authority access" });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Authenticate failed" });
  }
};

export default adminHandler;
