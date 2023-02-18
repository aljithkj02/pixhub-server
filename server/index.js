import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/db.js'
import userRouter from './routes/users.js';
import postRouter from './routes/posts.js';
import commentRouter from './routes/comments.js';
import authRouter from './routes/auth.js';


const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome to the Social Media Server")
})

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);
app.use('/api/auth', authRouter);



function startServer(){ 
    app.listen(process.env.PORT, async () => {
        await connectDB();
        console.log('Listening to PORT', process.env.PORT);
    })
}
startServer();