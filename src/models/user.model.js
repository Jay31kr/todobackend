import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    userName: { type: String, required: true, unique: true, lowercase: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 8 }
  },
  { timestamps: true }
);

// Hash password
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(
    this.password,
    Number(process.env.BCRYPT_SALT_ROUNDS) || 10
  );
});

// Compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default model("User", userSchema);
