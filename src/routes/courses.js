import express from 'express';
import passport from 'passport';

// Load controllers
import coursesControll from '../controllers/courseController'

const router = express.Router();

// @route   POST /course
// @desc    Create or edit a course on a profile
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), coursesControll.postCourse);

// @route   GET /courses
// @desc    Get all courses for current logged in user
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), coursesControll.getCourse);

// @route   DELETE /course
// @desc    Delete course from user profile
// @access  Private
router.delete('/', passport.authenticate('jwt', { session: false }), coursesControll.deleteCourse);

module.exports = router;