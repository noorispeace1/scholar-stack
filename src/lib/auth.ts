import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

if (!process.env.MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env");
}

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("scholar_stack"); // Connects to the scholar_stack database explicitly

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
  }),
  emailAndPassword: {
    enabled: true
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET_ID as string,
    }
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "student",
      },
      location: {
        type: "string",
        required: false,
      },
      coverPhoto: {
        type: "string",
        required: false,
      },
      phoneNumber: {
        type: "string",
        required: false,
      }
    }
  }
});