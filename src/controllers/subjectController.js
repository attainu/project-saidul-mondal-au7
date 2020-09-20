import Subject from '../models/Subject';

// Load validation
import validateSubjectInput from '../validation/subjectValidation';

const subjectControll = {
    postSubject: (req, res) => {
        for (var i = 0; i < req.body.subjects.length; i++) {
            const subject = req.body.subjects[i];
    
            const { errors, isValid } = validateSubjectInput(subject);
    
            // Check validation
            if (!isValid) {
                return res.status(400).json(errors);
            }
    
            const subjectFields = {};
            for (var key in subject) {
                if (subject[key]) subjectFields[key] = subject[key].trim();
            }
            subjectFields.id = subject.id ? subject.id.trim() : '';
    
            console.log(subjectFields);
    
            // See if there is already a subject with the subject ID
            Subject.findOne({ _id: subject._id }).then(subject => {
                if (subject) {
                    // Subject already exists
                    Subject.findOneAndUpdate(
                        { _id: subject._id },
                        { $set: subjectFields },
                        { new: true }
                    ).then(subject => res.json(subject));
                }
                // Subject does not already exist
                else {
                    new Subject(subjectFields).save().then(subject => res.json(subject));
                }
            });
        }
    },
    getSubject: async(req, res) => {
        const errors = {};

        try {
            const subjects = await Subject.find().populate('subjects', ['id', 'name', 'isMajor', 'isMinor']);
            if (!subjects) {
                errors.nosubjects = 'There are currently no subjects';
                return res.status(404).json();
            }
            res.json(subjects);
        }
        catch (err) {
            res.status(404).json({ subjects: 'Error retrieving subjects' });
        }
    },
    deleteSubject: (req, res) => {
        Subject.findOneAndRemove({ id: req.body.id }).then(() => res.json({ success: true }));
    }
}

module.exports = subjectControll