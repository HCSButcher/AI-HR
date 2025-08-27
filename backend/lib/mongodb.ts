import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;
if (!MONGODB_URI) throw new Error("Missing MONGODB_URI");

type Cached = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};
const cached: Cached = (global as any).mongoose || {
  conn: null,
  promise: null,
};
if (!(global as any).mongoose) (global as any).mongoose = cached;

export async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;
  if (!cached.promise)
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: process.env.MONGODB_DB || undefined,
    });
  cached.conn = await cached.promise;
  return cached.conn;
}
