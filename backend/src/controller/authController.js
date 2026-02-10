import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import { generateToken } from "../Utils/Utils.js";
import { sendWelcomeEmail } from "../emails/emailHandler.js";
import { ENV } from "../lib/env.js";
import { useId } from "react";
import cloudinary from "../lib/cloudinary.js";


export const signup = async (req, res) => {
    const { fullName, email, password } = req.body

    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 character" })
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({ message: "Email already exist" });
        }
        // 12342343=> 

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        if (newUser) {
            /*
             // before codeReview AI 
            generateToken(newUser._id, res);
            await newUser.save();

            // after codeReview AI

            // persist user first, then issue with cookie */
            const savedUser = await newUser.save();
            generateToken(savedUser._id, res);


            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            });


            // todo : send a welcome email to user 

            try {
                await sendWelcomeEmail(savedUser.email, savedUser.fullName, ENV.CLIENT_URL);
            } catch (error) {
                console.error("Failed to send welcome email:", error);
            }

        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.error("Error in signup controller:", error)
        res.status(500).json({ message: "Internal server error" });
    }

}

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "we can't find email and password" });

    try {
        console.log("LOGIN INPUT:", email, password);

        const user = await User.findOne({ email });
        console.log("USER FROM DB:", user);

        if (!user)
            return res.status(400).json({ message: "Invalid Credentials" });

        const isPassword = await bcrypt.compare(password, user.password);
        console.log("PASSWORD MATCH:", isPassword);

        if (!isPassword)
            return res.status(400).json({ message: "Invalid Credentials" });

        const token = generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
            token
        });

    } catch (error) {
        console.error("Error in login controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const logout = (_, res) => { // we don't need the req cause we're not fetching anything from either frontend or backend ( server )    
    // for logout we just remove the jwt tokens that't it and return the message in response that logged out successfully  

    res.cookie("jwt", "", { maxAge: 0 }); // "jwt" is a name of cookie and null in token and maxAge of this cookie is 0 
    res.status(200).json({ message: "Loggedd out successfully" });
}


export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id; // ✅ from protectRoute
    const { profilePic } = req.body;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    // Upload base64 image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(profilePic, {
      folder: "profile_pics",
    });

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    ).select("-password");

    return res.status(200).json(updatedUser);

  } catch (error) {
    console.error("Error in update profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};