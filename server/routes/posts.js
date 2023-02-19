import { Router } from 'express';
import { addPost, getPost } from '../controllers/posts.js'
import { authorize } from '../middleware/authorize.js'

const router = Router();

router.post('/',authorize, addPost);
router.get('/',authorize, getPost);


export default router;