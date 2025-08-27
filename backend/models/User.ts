import { Schema, model, models } from "mongoose";

export interface IUser {
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  photoUrl?: string;
  role?: "admin" | "reviewer" | "applicant";
}

const UserSchema = new Schema<IUser>(
  {
    clerkId: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, index: true },
    firstName: String,
    lastName: String,
    imageUrl: String,
    photoUrl: String,
    role: {
      type: String,
      enum: ["admin", "reviewer", "applicant"],
      default: "reviewer",
    },
  },
  { timestamps: true }
);

export default models.User || model<IUser>("User", UserSchema);
