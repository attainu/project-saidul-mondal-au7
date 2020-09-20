import express from 'express';
import passport from 'passport';

// Load controllers
import userControll from '../controllers/userController';

const router = express.Router();
// @route   POST users/register
// @desc    Register User
// @access  Public
router.post('/register', userControll.register);

// @route   POST users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', userControll.login);

// @route   GET users/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), userControll.current);

// @route   POST users/admin
// @desc    Updates the isAdmin property
// @access  Private
router.post('/admin', passport.authenticate('jwt', { session: false}), userControll.admin);

module.exports = router;
