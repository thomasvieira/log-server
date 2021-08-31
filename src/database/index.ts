import { MongoClient } from 'mongodb';

export async function connection() {
  const uri = process.env.MONGODB_CONNECTION_STRING;
  const client = new MongoClient(uri);

  return await client.connect();
}
