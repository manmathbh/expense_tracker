// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const router = express.Router();

// // @route   POST api/auth/register
// // @desc    Register a user
// router.post('/register', async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         let user = await User.findOne({ username });
//         if (user) {
//             return res.status(400).json({ msg: 'User already exists' });
//         }
//         user = new User({ username, password });
//         await user.save();
//         res.status(201).json({ msg: 'User registered successfully' });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// });

// // @route   POST api/auth/login
// // @desc    Authenticate user & get token
// router.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         const user = await User.findOne({ username });
//         if (!user) {
//             return res.status(400).json({ msg: 'Invalid Credentials' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ msg: 'Invalid Credentials' });
//         }

//         const payload = { user: { id: user.id } };
//         jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
//             if (err) throw err;
//             res.json({ token });
//         });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// });

// module.exports = router;

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// @route   POST api/auth/register
// @desc    Register a user
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    
    // Input validation to prevent unnecessary DB queries
    if (!username || !password) {
        return res.status(400).json({ msg: 'Please provide username and password' });
    }
    if (username.length < 3) {
        return res.status(400).json({ msg: 'Username must be at least 3 characters' });
    }
    if (password.length < 6) {
        return res.status(400).json({ msg: 'Password must be at least 6 characters' });
    }
    
    try {
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        user = new User({ username, password });
        await user.save();
        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' }); // FIX: Send JSON on error
    }
});

// @route   POST api/auth/login
// @desc    Authenticate user & get token
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    // Input validation to prevent unnecessary DB queries
    if (!username || !password) {
        return res.status(400).json({ msg: 'Please provide username and password' });
    }
    
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = { user: { id: user.id } };
        // Promisified jwt.sign for better async/await consistency
        const token = await new Promise((resolve, reject) => {
            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
                if (err) reject(err);
                else resolve(token);
            });
        });
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' }); // FIX: Send JSON on error
    }
});

module.exports = router;