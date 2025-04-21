import BioModel from '../Model/BioModel.js';

// Add Bio
export const addBio = async (req, res) => {
   
        try {
          const userId = req.user._id; // from JWT middleware
          const { title, description } = req.body;
      
          const newBio = new BioModel({
            user: userId,
            title,
            description,
          });
      
          await newBio.save();
      
          res.status(201).json({ success: true, message: 'Bio created', bio: newBio });
        } catch (err) {
          console.error(err);
          res.status(500).json({ success: false, message: 'Server error' });
        }
      };
export const getBio = async (req, res) => {
        try {
          const bios = await BioModel.find({ user: req.user._id });
          res.status(200).json({ bios });
        } catch (err) {
          res.status(500).json({ message: "Server error" });
        }
      };
            