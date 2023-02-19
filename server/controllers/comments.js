import Comment from '../models/comment.model.js';

export const getComments = async (req, res) => {
    try {
        const { id } = req.params;  
        let comments = await Comment.find({ post_id: id }).sort({ createdAt: -1}); 
        res.status(200).json({  
            success: true,
            data: comments
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const addComment = async (req, res) => {
    try {
        const { id } = req.params;  
        const { name, profile_pic } = req.user;
        const { comment } = req.body;
        let commentObj = {
            post_id: id,
            user_name: name,
            user_img: profile_pic,  
            comment 
        }
        let result = await Comment.create(commentObj); 
        res.status(200).json({  
            success: true,
            data: comment
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}