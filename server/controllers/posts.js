import Post from '../models/post.model.js';
import {v2 as cloudinary} from 'cloudinary'

export const addPost = async (req, res) => {
    try {
        const { name, desc, img, user_id, user_img, public_id, version, signature } = req.body;
        const expectedSignature = cloudinary.utils.api_sign_request({ 
            public_id: public_id, version: version 
        }, process.env.CLOUD_API_SECRET);

        if (expectedSignature === req.body.signature) {
            let postObj = {
                desc, 
                user_id: req.user._id,
                user_img: req.user.profile_pic,
                name: req.user.name,
                img: public_id
            }
            let result = await Post.create(postObj); 

            res.status(200).json({ 
                success: true,
                message: 'Posted successful!'
            })
        }else{
            res.status(400).json({ 
                success: false,
                message: 'Something went wrong!'
            })
        }

    } catch (err) {
        console.log(err.message)
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const getPost = async (req, res) => {
    try {
        let id = "63f0ef3fca8c5c45c01d91cb";
        let posts = await Post.find({}).sort({ createdAt: -1});
        res.status(200).json({ 
            success: true,
            data: posts
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
