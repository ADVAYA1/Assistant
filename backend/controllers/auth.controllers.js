
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// 2. ADD THIS FUNCTION
const genToken = (userId) => {
    // This requires you to have JWT_SECRET in your .env file
    return jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};

export const signUp = async (req, res) => {


try {
    const { name, email, password } = req.body;

    const existEmail = await User.findOne({ email });
    if (existEmail) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    if(password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    const token = await genToken(user._id);

    res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            sameSite: "None", // Allow cross-domain requests
            secure: true      // Only send over HTTPS
        });

    return res.status(201).json(user)

}
catch (error) {    console.error('Error during sign up:', error);
    res.status(500).json({ message: 'Internal server error' });

}
}


export const Login = async (req, res) => {


try {
    const {  email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Email does not exists' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if( !isPasswordValid) {
        return res.status(400).json({ message: 'incorrect password' });
    }
    
    const token = await genToken(user._id);

    res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            sameSite: "None", // Allow cross-domain requests
            secure: true      // Only send over HTTPS
        });

    return res.status(200).json(user)

}
catch (error) {    console.error('Error during Login:', error);
    res.status(500).json({ message: 'Internal server error' });

}
}

export const Logout = async (req, res) => {

try {

    res.clearCookie("token");
    return res.status(200).json({ message: 'Logged out successfully' });
} catch (error) {
    console.error('Error during Logout:', error);
}

}
