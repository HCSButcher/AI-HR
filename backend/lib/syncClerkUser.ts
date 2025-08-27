import User from "../models/User";
import { dbConnect } from "../mongodb";
import { clerkClient } from "@clerk/nextjs/server";
import { uploadProfileImage } from "./cloudinary";

export async function syncClerkUser(userId: string) {
  await dbConnect();

  const clerkUser = await clerkClient.users.getUser(userId);

  let existingUser = await User.findOne({ clerkId: clerkUser.id });

  // Upload profile photo to Cloudinary if exists
  let photoUrl = clerkUser.imageUrl;
  if (clerkUser.imageUrl) {
    const result = await uploadProfileImage(clerkUser.imageUrl, clerkUser.id);
    photoUrl = result.secure_url;
  }

  if (!existingUser) {
    existingUser = await User.create({
      clerkId: clerkUser.id,
      email: clerkUser.emailAddresses[0]?.emailAddress,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
      imageUrl: clerkUser.imageUrl,
      photoUrl,
      role: "reviewer", // default
    });
  } else {
    existingUser.email = clerkUser.emailAddresses[0]?.emailAddress;
    existingUser.firstName = clerkUser.firstName || existingUser.firstName;
    existingUser.lastName = clerkUser.lastName || existingUser.lastName;
    existingUser.imageUrl = clerkUser.imageUrl;
    existingUser.photoUrl = photoUrl;
    await existingUser.save();
  }

  return existingUser;
}
