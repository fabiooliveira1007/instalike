import { MongoClient } from 'mongodb';

export default async function connectToDB(dbURL) {
  let mongoClient;

  try {
    mongoClient = new MongoClient(dbURL);
    console.log('Connecting to cluster (MongoDB)...');
    await mongoClient.connect();
    console.log('connection established successfully (MongoDB)');

    return mongoClient;
  } catch (error) {
    console.error('Failed to connect to database');
    process.exit();
  }
}
