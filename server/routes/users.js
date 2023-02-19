import { Router } from 'express';
import { getUser, followUser, updateProfile } from '../controllers/users.js';
import { authorize } from '../middleware/authorize.js'

const router = Router();

router.get('/find/:id', authorize, getUser);
router.get('/follow/:id', authorize, followUser);
router.post('/update', authorize, updateProfile);
 

export default router; 