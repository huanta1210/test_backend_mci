import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
import router from './routes/index';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connection established'))
  .catch((err) => console.log('MongoDB connection falied', err.message));

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
app.use(cors(corsOptions));
app.use('/api', router);

export const viteNodeApp = app;
