import { betterAuth } from 'better-auth';
import { mongodbAdapter } from '@better-auth/mongo-adapter';
import { jwt } from 'better-auth/plugins';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error('MONGO_URI must be defined');
}

// Instantiate a native MongoClient specifically for Better Auth to use.
// This is synchronous and allows Better Auth to export cleanly.
// We set transaction: false because many free tier MongoDB clusters (standalone)
// do not support transactions natively.
const client = new MongoClient(mongoUri);
const db = client.db(process.env.DB_NAME);

export const auth = betterAuth({
  trustedOrigins: [process.env.CLIENT_URL as string],
  database: mongodbAdapter(db, {
    client, // Pass the client for connection tracking
    transaction: false, // Prevents issues on standalone Mongo clusters
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [
    jwt({
      jwt: {
        expirationTime: '24h',
      },
    }),
  ],
});
