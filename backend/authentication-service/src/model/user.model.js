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
  name: {
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
