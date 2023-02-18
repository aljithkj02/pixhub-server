import Post from '../models/post.model.js';

export const addPost = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await Post.findOne({ email });
        
        res.status(200).json({
            success: true,
            message: 'Registration successful!'
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
