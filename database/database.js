import mongoose from 'mongoose';
const MONGODB_URI = "mongodb+srv://rajeev:1409rajeev@cluster0.ronsn.mongodb.net/tasklist?retryWrites=true&w=majority"
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect () {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => {
        console.log("success");
      return mongoose
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect
