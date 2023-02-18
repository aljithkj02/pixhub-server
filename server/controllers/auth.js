import User from '../models/user.model.js';

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
        if(user){
            return res.status(409).json({
                success: false,
                message: 'User with this email is already present!'
            })
        }
        user = {
            name,
            email,
            password,
            cover_pic: 'https://images.pexels.com/photos/3586966/pexels-photo-3586966.jpeg?auto=compress&cs=tinysrgb&w=600',
            profile_pic: 'https://images.pexels.com/photos/5157169/pexels-photo-5157169.jpeg?auto=compress&cs=tinysrgb&w=600'
        }
        let result = await User.create(user);
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

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found!'
            })
        }
        if(user.password !== password){
            return res.status(400).json({
                success: false,
                message: 'Incorrect password!'
            })
        }
        res.send({
            success: true,
            message: 'Login successful!'
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}