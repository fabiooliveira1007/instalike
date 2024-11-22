import { getPosts, createPost, updatePost } from '../models/postsModel.js';
import generateGeminiDescription from '../services/geminiService.js';
import fs from 'node:fs';

export async function listPosts(req, res) {
  try {
    const posts = await getPosts();
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function createNewPost(req, res) {
  const postData = req.body;

  try {
    const createdPost = await createPost(postData);
    res.status(201).json(createdPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function imageUpload(req, res) {
  const postData = {
    description: '',
    imgUrl: req.file.originalname,
    alt: '',
  };

  try {
    const createdPost = await createPost(postData);
    const updatedImage = `uploads/${createdPost.insertedId}.png`;
    fs.renameSync(req.file.path, updatedImage);
    res.status(201).json(createdPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function updateNewPost(req, res) {
  const { id } = req.params;
  const image = `http://localhost:3000/${id}.png`;

  try {
    const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
    const description = await generateGeminiDescription(imgBuffer);
    const post = {
      imgUrl: image,
      description: description,
      alt: req.body.alt,
    };
    const createdPost = await updatePost(id, post);
    res.status(201).json(createdPost);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
