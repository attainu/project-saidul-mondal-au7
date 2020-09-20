import express from 'express';
import passport from 'passport';

//Load controllers
import subjectControll from '../controllers/subjectController'

const router = express.Router();

// @route   POST /subjects
// @desc    Create or edit a subject
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), subjectControll.postSubject);

// @route   GET /subjects
// @desc    Get all subjects
// @access  Private 
router.get('/', subjectControll.getSubject);

// @route   DELETE /subjects
// @desc    Delete a subject by id
// @access  Private
router.delete('/', passport.authenticate('jwt', { session: false }), subjectControll.deleteSubject);

module.exports = router;