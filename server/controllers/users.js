import User from '../models/user.model.js';
import {v2 as cloudinary} from 'cloudinary'

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ _id: id });
        if(user) {
            return res.status(200).send({
                success: true,
                data: user
            })
        }
        res.status(404).send({
            success: false,
            message: 'something went wrong!'
        })
    } catch (err) { 
        res.status(200).json({ 
            success: false,
            message: err.message
        })
    }
}
 
export const followUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ _id: id });
        if(user) {
            if(user.followers.includes(req.user._id)){
                user.followers.splice(user.followers.indexOf(req.user._id), 1);
            }else{
                user.followers.push(req.user._id);
            }
            let result = await User.findOneAndUpdate({ _id: id }, user );
            res.status(200).json({ 
                success: true,
                message: 'success!'
            })
        }else{
            res.status(404).send({
                success: false,
                message: 'something went wrong!'
            })
        }
    } catch (err) { 
        res.status(200).json({ 
            success: false,
            message: err.message
        })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { name, city, website, images } = req.body;
        let user = req.user;
        images.forEach(({ type, data }) => {
            const { public_id, version, signature } = data;
            if(type === 'cover'){
                const expectedSignature = cloudinary.utils.api_sign_request({ 
                    public_id: public_id, version: version 
                }, process.env.CLOUD_API_SECRET);
                if (expectedSignature === signature) {
                    user.cover_pic = public_id;
                }
            }else{
                const expectedSignature = cloudinary.utils.api_sign_request({ 
                    public_id: public_id, version: version 
                }, process.env.CLOUD_API_SECRET);
                if (expectedSignature === signature) {
                    user.profile_pic = public_id;
                }
            }
        })
        user.name = name;
        user.city = city;
        user.website = website;

        let result = await User.findOneAndUpdate({ _id: user._id}, user); 
        res.status(200).json({ 
            success: true,
            message: 'Updated successful!'
        })

        // if (expectedSignature === req.body.signature) {
        //     let postObj = {
        //         desc, 
        //         user_id: req.user._id,
        //         user_img: req.user.profile_pic,
        //         name: req.user.name,
        //         img: public_id,
        //         total_comments: 0
        //     }
        //     let result = await Post.create(postObj); 

        //     res.status(200).json({ 
        //         success: true,
        //         message: 'Posted successful!'
        //     })
        // }else{
        //     res.status(400).json({ 
        //         success: false,
        //         message: 'Something went wrong!'
        //     })
        // }
    } catch (err) { 
        res.status(200).json({ 
            success: false,
            message: err.message
        })
    }
}
 
 