import express from 'express';
import cors from 'cors';
import {
  listPosts,
  createNewPost,
  imageUpload,
  updateNewPost,
} from '../controllers/postsController.js';
import { upload } from '../config/multerStorage.js';

const corsOptions = {
  origin: 'http://localhost:8000',
  optionsSuccessStatus: 200,
};

const routes = app => {
  app.use(express.json());
  app.use(cors(corsOptions));
  app.get('/posts', listPosts);
  app.post('/posts', createNewPost);
  app.post('/upload', upload.single('image'), imageUpload);
  app.put('/upload/:id', updateNewPost);
};

export default routes;
