import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthService {
  constructor() {}

  //find the user exist
  async getUser(uid) {
    try {
      //find the user exist or not using email or password
      const user = await User.findOne({
        id: uid,
      });

      console.log(user);

      return user;
    } catch (error) {
      throw error;
    }
  }

  //validate the password
  async validatePassword(logPassword, userPassword) {
    //compare the user's rrequest password against db hashed password
    const validPassword = await bcrypt.compare(logPassword, userPassword);

    return validPassword;
  }

  //generate user token
  async generateUserToken(user) {
    const token = jwt.sign({ user: user }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return token;
  }

  //async generate hashed password
  async generateHashedPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }

  //encapsulated method to validateUser
  async validateUser(uid, password) {
    try {
      const user = await this.getUser(uid);

      if (!user || !(await this.validatePassword(password, user.password))) {
        return null;
      }

      return this.generateUserToken(user);
    } catch (error) {
      next(error);
    }
  }

  //create new user in database
  async createUser(user) {
    try {
      //   const hashedPassword = await this.generateHashedPassword(password);

      const newuser = await User.create({
        id: user.id,
        name: `${user.given_name} ${user.family_name}`,
        email: user.email,
      });

      return newuser;
    } catch (error) {
      throw error;
    }
  }
}

export default AuthService;
