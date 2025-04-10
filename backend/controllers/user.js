    // const express = require('express');
    // const router = express.Router();
    // const User = require('../models/userModel');
    // const bcrypt = require('bcryptjs');
    // const jwt = require('jsonwebtoken');
    // const secret = process.env.JWT_SECRET;

    // // Signup Route
    // exports.signup =  async (req, res) => {
    //     const { username, name, email, password } = req.body;

    //     try {
    //         // Step 1: Check if email already exists
    //         const emailExists = await User.findOne({ email });
    //         if (emailExists) {
    //             return res.status(400).json({ success: false, message: "Email already exists" });
    //         }

    //         // Step 2: Hash the password
    //         const salt = await bcrypt.genSalt(10);
    //         const hashedPassword = await bcrypt.hash(password, salt);

    //         // Step 3: Create a new user
    //         const user = await User.create({
    //             username,
    //             name,
    //             email,
    //             password: hashedPassword,
    //         });

    //         // Step 4: Generate a token
    //         const token = jwt.sign({ userId: user._id, email: user.email }, secret);

    //         return res.status(201).json({
    //             success: true,
    //             message: "User created successfully",
    //             userId: user._id,
    //             token,
    //         });
    //     } catch (error) {
    //         console.error("Signup Error:", error);
    //         return res.status(500).json({ success: false, message: "Server error" });
    //     }
    // };

    // // Login Route
    // exports.login = async (req, res) => {
    //     const { email, password } = req.body;

    //     try {
    //         // Step 1: Find user by email
    //         const user = await User.findOne({ email });
    //         if (!user) {
    //             return res.status(404).json({ success: false, message: "User does not exist" });
    //         }

    //         // Step 2: Compare passwords
    //         const isPasswordValid = await bcrypt.compare(password, user.password);
    //         if (!isPasswordValid) {
    //             return res.status(400).json({ success: false, message: "Invalid password" });
    //         }

    //         // Step 3: Generate a token
    //         const token = jwt.sign({ userId: user._id, email: user.email }, secret);

    //         return res.status(200).json({
    //             success: true,
    //             message: "User logged in successfully",
    //             userId: user._id,
    //             token,
    //         });
    //     } catch (error) {
    //         console.error("Login Error:", error);
    //         return res.status(500).json({ success: false, message: "Server error" });
    //     }
    // };


    const express = require('express');

    const User = require('../models/userModel');
    const bcrypt = require('bcryptjs');
    const jwt = require('jsonwebtoken');


    const secret = process.env.JWT_SECRET

    // Signup Route
    exports.signup = async (req, res) => {
        const { username, name, email, password } = req.body;
    console.log(req.body)
        // Check if required fields are provided
        if (!username || !name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        try {
            // Step 1: Check if email already exists
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ success: false, message: "Email already exists" });
            }

            // Step 2: Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Step 3: Create a new user
            const user = await User.create({
                username,
                name,
                email,
                password: hashedPassword,
            });

            // Step 4: Generate a token
            const token = jwt.sign({ userId: user._id, email: user.email }, secret);

            return res.status(201).json({
                success: true,
                message: "User created successfully",
                userId: user._id,
                token,
            });
        } catch (error) {
            console.error("Signup Error:", error);
            return res.status(500).json({ success: false, message: "Server error" });
        }
    };

    //Login route
    
    exports.login = async (req, res) => {
        const { email, password } = req.body;
    
        // Check if required fields are provided
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }
    
        try {
            // Step 1: Find user by email
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ success: false, message: "User does not exist" });
            }
    
            // Step 2: Compare passwords
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ success: false, message: "Invalid password" });
            }
    
            // Step 3: Generate a token
            const token = jwt.sign({ userId: user._id, email: user.email }, secret);
    
            return res.status(200).json({
                success: true,
                message: "User logged in successfully",
                userId: user._id,
                username: user.username,
                name: user.name,
                token,
            });
        } catch (error) {
            console.error("Login Error:", error);
            return res.status(500).json({ success: false, message: "Server error" });
        }
    };
    
    