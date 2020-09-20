import Profile from '../models/Profile';
import User from '../models/User';

// Load validation
import validateProfileInput from '../validation/profileValidation';

const profileControll = {
    allProfiles: async (req, res) => {
        const errors = {};
        try {
            const profiles = await Profile.find(
                { disabled: false }
            ).populate({
                path: 'user',
                select: ['firstname', 'lastname', 'email', 'isAdmin']
            });

            if (!profiles) {
                errors.noprofile = 'This user has not created a profile';
                return res.status(404).json();
            }
            res.json(profiles);
        }
        catch (err) {
            res.status(404).json({ profile: 'Error retrieving profile' });
        }
    },
    allUsers: async (req, res) => {
        const errors = {};
        try {
            const users = await User.find().populate({
                path: 'user',
                select: ['firstname', 'lastname', 'email', 'isAdmin']
            });

            if (!users) {
                errors.noprofile = 'This user has not created a profile';
                return res.status(404).json();
            }
            res.json(users);
        }
        catch (err) {
            res.status(404).json({ user: 'Error retrieving users' });
        }
    },
    handle: async (req, res) => {
        const errors = {};
        try {
            const profile = await Profile.findOne({ handle: req.params.handle })
                .populate('user', ['firstname', 'lastname', 'email', 'isAdmin']);
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }
            res.json(profile);

        }
        catch (err) {
            res.status(404).json(err);
        }
    },
    postProfile: (req, res) => {
        const { errors, isValid } = validateProfileInput(req.body);

        // Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }
        
        // Get fields
        const profileFields = {};
        profileFields.user = req.user.id; 

        if (req.body.handle) profileFields.handle = req.body.handle;
        if (req.body.major) profileFields.major = req.body.major;
        if (req.body.minor) profileFields.minor = req.body.minor;
        if (req.body.type) profileFields.type = req.body.type;
        if (req.body.courses) profileFields.courses = req.body.courses;
        profileFields.bio = req.body.bio ? req.body.bio : '';
        profileFields.availability = req.body.availability ? req.body.availability : '';


        Profile.findOne({ user: req.user.id }).then(profile => {
            if (profile) {
                // Update profile
                Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                ).then(profile => res.json(profile));
            }
            // Profile not found
            else {
                Profile.findOne({ handle: profileFields.handle }).then(profile => {
                    new Profile(profileFields).save().then(profile => res.json(profile));
                });
                // set has profile field to true
                User.findOne({ _id: req.user.id }).then(user => {
                    if (user) {
                        User.findOneAndUpdate(
                            { _id: req.user.id },
                            { $set: { hasProfile: true }}
                        ).then(user => res.json(user));
                    }
                });
            }
        });
    },
    getProfile: async (req, res) => {
        const errors = {};
        try {
            const profile =  await Profile.findOne({ user: req.user.id })
                .populate('user', ['isAdmin']);
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors);
            }
            res.json(profile);
        }
        catch (err) {
            res.status(404).json(err);
        }
    },
    disableProfile: async (req, res) => {
        try {
            console.log(req.body.userId)
            const profile = await Profile.findOneAndUpdate(
                { user: req.body.userId},
                { $set: { disabled: true }}
            ).then(profile => {
                res.json(profile);
                User.findOneAndUpdate({ _id: req.body.userId }, {$set: {disabled: true }}).then(user => res.json(user));
            });
        }
        catch (err) {
            console.error(err);
    
        }
    },
    enableProfile: async (req, res) => {
        try {
            console.log(req.body.userId)
            const profile = await Profile.findOneAndUpdate(
                { user: req.body.userId},
                { $set: { disabled: false }}
            ).then(profile => {
                res.json(profile);
                User.findOneAndUpdate({ _id: req.body.userId}, {$set: {disabled: false }}).then(user => res.json(user));
            });
    
        }
        catch (err) {
            console.error(err);
        }
    },
    deleteProfile: (req, res) => {
        Profile.findOneAndRemove({ user: req.user.id }).then(() => {
            User.findOneAndRemove({ _id: req.user.id }).then(() =>
              res.json({ success: true })
            );
          });
    },
    deleteProfileId: (req, res) => {
        User.findOne({ _id: req.body.id.user }).then(user => {
            if (user) {
                if (user.hasProfile) {
                    Profile.findOneAndRemove({ user: req.body.id.user }).then(() => {
                        User.findOneAndRemove({ _id: req.body.id.user }).then(() =>
                          res.json({ success: true })
                        );
                    });
                }
                else {
                    User.findOneAndRemove({ _id: req.body.id.user }).then(() =>
                      res.json({ success: true })
                    );
                }
  
            }
        });
    }

}

module.exports = profileControll