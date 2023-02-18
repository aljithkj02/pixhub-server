import { Router } from 'express';
import { addPost } from '../controllers/posts.js'

const router = Router();

router.post('/', addPost);


export default router;