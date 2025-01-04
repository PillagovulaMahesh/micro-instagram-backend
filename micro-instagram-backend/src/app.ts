import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.routes';
import postRoutes from './routes/post.routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());

// User routes
app.use('/api/users', userRoutes);

// Post routes
app.use('/api/posts', postRoutes);

export default app;
