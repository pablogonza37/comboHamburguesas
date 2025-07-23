import mongoose from "mongoose";

const MONGODB_URI =
  "mongodb+srv://pabgonzalez3798:4RqmxtpXnbMgFQ4J@backendnext.c3uqulz.mongodb.net/Pedidos";

if (!MONGODB_URI) throw new Error("Falta la URI de MongoDB");

let cached = global.mongoose || { conn: null, promise: null };
global.mongoose = cached;

const connectDB = async () => {
  if (cached.conn) return cached.conn;

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDB;
