import express from 'express';
import passport from 'passport';

//Load controllers
import profileControll from '../controllers/profileController'

const router = express.Router();
// @route   GET profile/all
// @desc    Get all users' profiles
// @access  Public
router.get('/all', profileControll.allProfiles);

// @desc    Get profile/allUsers
// @access  Admin
router.get('/allusers', profileControll.allUsers);

// @route   GET profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get('/handle/:handle', profileControll.handle);

// @route   GET profile/
// @desc    Get current user's profile
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), profileControll.getProfile);


// @route   POST profile/
// @desc    Create or edit user profile
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false}), profileControll.postProfile);

router.post('/disableProfile', passport.authenticate('jwt', { session: false }), profileControll.disableProfile);

router.post('/enableProfile', passport.authenticate('jwt', { session: false }), profileControll.enableProfile);

// @route   DELETE profile/
// @desc    Delete user and profile of current logged in user
// @access  Private
router.delete('/', passport.authenticate('jwt', { session: false }), profileControll.deleteProfile);

// @route   DELETE profile/id
// @desc    Delete user and profile by id (for admin)
// @access  Private
router.delete('/id', passport.authenticate('jwt', { session: false }), profileControll.deleteProfileId);

module.exports = router;