import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error("Missing MONGODB_URI in .env.local");

const cached: {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
} = (global as any).mongoose || { conn: null, promise: null };
if (!(global as any).mongoose) (global as any).mongoose = cached;

export async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    const mongooseServer = await import("mongoose");
    cached.promise = mongooseServer.connect(MONGODB_URI);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
