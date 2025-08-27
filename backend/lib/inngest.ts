import { Inngest } from "inngest";

export const inngest = new Inngest({ name: "AI HR App Events" });

// Example event: user signed in
export const userSignedIn = inngest.createFunction(
  { name: "User Signed In", event: "user.signed_in" },
  async ({ event }) => {
    console.log("User signed in event triggered:", event);
  }
);
