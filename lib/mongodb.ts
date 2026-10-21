import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}
// define cache interface
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Store the cache globally so it survives module reloads in development.
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}
// to create a new object with conn and promise if it doesnt exist,set to null
const cached: MongooseCache = globalThis.mongooseCache ??= {
  conn: null,
  promise: null,
};


async function dbConnect(): Promise<typeof mongoose> {
  // Return the existing connection if it is already established.
  if (cached.conn) {
    return cached.conn;
  }

  // Reuse an in-progress connection instead of creating another one.
  if (!cached.promise) {
    
if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}
    const options = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGODB_URI!, options);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    // Allow a later request to retry if the connection fails.
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default dbConnect;
