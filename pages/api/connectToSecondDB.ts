import mongoose from "mongoose";

let secondDbConnection: mongoose.Connection | null = null;

const SECOND_MONGODB_URI =
  "mongodb+srv://raj_adi:adityaraj234@cluster0.nljbs.mongodb.net/culfest_users";

export async function connectToSecondDB(): Promise<mongoose.Connection> {
  if (secondDbConnection && secondDbConnection.readyState === 1) {
    return secondDbConnection;
  }

  secondDbConnection = mongoose.createConnection(SECOND_MONGODB_URI);

  // Wait for the connection to be ready
  await new Promise<void>((resolve, reject) => {
    secondDbConnection!.on("connected", resolve);
    secondDbConnection!.on("error", reject);
  });

  return secondDbConnection;
}

// User schema for the second database (mirrors the primary User schema)
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    phone: String,
    city: String,
    state: String,
    college: String,
    gender: String,
    graduationYear: String,
    isNITJSR: Boolean,
    registeredEvents: { type: [String], default: [] },
  },
  { timestamps: true }
);

export async function getSecondDBUserModel() {
  const conn = await connectToSecondDB();
  // Reuse existing model if already compiled on this connection
  return conn.models.User || conn.model("User", userSchema);
}
