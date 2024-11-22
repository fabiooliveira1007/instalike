import 'dotenv/config';
import { ObjectId } from 'mongodb';
import connectToDB from '../config/dbConfig.js';

const connection = await connectToDB(process.env.DATABASE_URL);

export async function getPosts() {
  const db = connection.db('instabytes');
  const collection = db.collection('posts');
  return collection.find().toArray();
}

export async function createPost(postData) {
  const db = connection.db('instabytes');
  const collection = db.collection('posts');
  return collection.insertOne(postData);
}

export async function updatePost(id, newPost) {
  const db = connection.db('instabytes');
  const collection = db.collection('posts');
  const objID = ObjectId.createFromHexString(id);
  return collection.updateOne({ _id: new ObjectId(objID) }, { $set: newPost });
}
