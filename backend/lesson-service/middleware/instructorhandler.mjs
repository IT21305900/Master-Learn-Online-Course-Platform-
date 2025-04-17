const facultyHandler = (req, res, next) => {
  try {
    const { user } = req.user;


    if (!user.roles.includes("admin") && !user.roles.includes("faculty")) {
      return res.status(403).json({ message: "No authority access" });
    }

    next();
  } catch (error) {
    res.status(404).json({ message: "Authenticate failed" });
  }
};

export default facultyHandler;
