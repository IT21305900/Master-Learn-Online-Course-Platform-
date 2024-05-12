import { Schema, SchemaType, model } from "mongoose";

const UserSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  roles: [],
});

const UserModel = model("User", UserSchema);
export default UserModel;
