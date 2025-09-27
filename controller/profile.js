const profile = require('../models/profile');


//get a all profile
const getAllProfile = async(req,res) =>{
    try {
        const data = await profile.find({});
        if(data.length  === 0){
            return res.status(204).json({message : "No data in Database"})
        }
        else {
            res.status(200).json({data:data , message : "Data fetched successfully"})
        }

    } catch (error) {
        console.error('Error creating profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

//get a profile for Login
const getProfileForLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const data = await profile.findOne({ username, password });

    if (!data) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    res.status(200).json({ data, message: "Login successful" });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

//get data by id
const getProfileById = async(req,res) =>{

    try {
        const id = req.params.id;
        const data = await profile.findById(id);
        if(!data){
            return res.status(404).json({message : "No data found in Database for this id"})
        }
        else {
            res.status(200).json({data:data , message : "Data fetched successfully"})
        }

    } catch (error) {
        console.error('Error creating profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Create a new profile
const createProfile = async (req, res) => {

    try {
        const CreateFields = [
        'name', 'username', 'email', 'photo', 'skill', 'bio',
        'education', 'phone', 'gender', 'dob', 'location', 'experience','password'
        ];
        const profileData = {};
        for(const field of CreateFields) {
            if(field in req.body) profileData[field] = req.body[field];
        }

        if(!profileData.name || !profileData.username || !profileData.email){
            return res.status(400).json({ message: 'Name, Username and Email are required' });
        }

        if (profileData.skill) {
            profileData.skill = profileData.skill
                .split(',')
                .map(s => s.trim())
                .filter(s => s !== '');
            }

        if (req.file) {
            const base64 = req.file.buffer.toString('base64');
            profileData.photo = `${req.file.mimetype};base64,${base64}`;
            }

        const existingProfile = await profile.findOne({ username: profileData.username });
        if(existingProfile){
            return res.status(409).json({ message: 'Username already exists' });
        }
        const newProfile =await profile.create( profileData );
        res.status(201).json({data: newProfile , message: 'Profile created successfully' });

    } catch (error) {
        console.error('Error creating profile:', error);
         if (error.message === 'File too large') {
            return res.status(400).json({ message: 'Profile photo must be less than 200 KB' });
        }
        if (error.message === 'Only image files are allowed!') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Server error' });
    }

}

//Update a profile by ID
const updateProfile = async (req, res) => {
    try {
        const id = req.params.id; 
        const allowedFields = [
        'name', 'username', 'email','password', 'photo', 'skill', 'bio',
        'education', 'phone', 'gender', 'dob', 'location', 'experience'
        ];
        const updateFields = {};
        for (const field of allowedFields) {
            if (field in req.body)  updateFields[field] = req.body[field];
            
        }
        
        if (req.file) {
            const base64 = req.file.buffer.toString('base64');
            updateFields.photo = `${req.file.mimetype};base64,${base64}`;
            }

        if (updateFields.skill) {
            updateFields.skill = updateFields.skill
                .split(',')
                .map(s => s.trim())
                .filter(s => s !== '');
            }

        const updatedProfile = await profile.findByIdAndUpdate(id, { $set: updateFields },{ new: true, runValidators: true, context: 'query' });

        if (!updatedProfile)  return res.status(404).json({ message: 'Profile not found' });

        res.status(200).json({data: updatedProfile,message: 'Profile updated successfully'});
    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a profile by ID
const deleteProfile = async (req, res) => {

    try {
        const id = req.params.id;

        const data = await profile.findById(id);
        if (!data) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        await profile.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json({ message: 'Profile deleted successfully' });

    } catch (error) {
        console.error('Error deleting profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

//Delete a Profile data by ID
  const deleteProfileDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const { fields } = req.body;
    if (!Array.isArray(fields) || fields.length === 0) {
      return res.status(400).json({ message: 'fields must be a non-empty array' });
    }
    const allowedFields = {
      name: "", username: "",password: "",email: "",photo: "",bio: "",phone: "",gender: "",location: "",dob: null,education: [],skill: [],experience: ""};
    const updateFields = {};
    for (const field of fields) {
      if (field in allowedFields) {
        updateFields[field] = allowedFields[field];
      }
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: 'No valid fields to clear' });
    }

    const updatedProfile = await profile.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );
    if (!updatedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json({
      message: 'Specified fields cleared successfully',
      data: updatedProfile
    });

  } catch (error) {
    console.error('Error clearing fields:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
    createProfile ,
    getProfileById,
    getAllProfile,
    deleteProfile ,
    updateProfile,
    getProfileForLogin,
    deleteProfileDataById
}