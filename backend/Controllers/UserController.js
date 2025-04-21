import UserModel from "../Model/UserModel.js";
import bcryptjs from 'bcryptjs'
import jsonwebtoken from 'jsonwebtoken';

export const adddata =  async(req,res)=>{
    try{
        const{email,password} = req.body;
        const userdata = await UserModel.findOne({email})
        if(userdata){
            return res.status(409)
            .json({ message: 'User already exists' })
        }
        const createuser = new UserModel({email,password});
        createuser.password = await bcryptjs.hash(password,10);
        await createuser.save();
        res.status(201)
        .json({
            message:"Signup Successfully",
            success:true
        })
    }
    catch(error){
        res.status(500)
        .json({
            message:"Server Error",
            success:false
        })
    }
}

export const checkdata =  async(req,res)=>{
    try{
        const{email,password} = req.body;
        const userdata = await UserModel.findOne({email})
        if(!userdata){
            return res.status(403)
            .json({
                message:"Email and Password is Wrong",
                success:false
            })
        }
        const ispassequal = await bcryptjs.compare(password,userdata.password);
        if(!ispassequal){
            return res.status(403)
            .json({
                message:"Password is Wrong",
                success:false
            })
        }
        const jwttoken = jsonwebtoken.sign(
            {email: userdata.email, _id:userdata._id},
            process.env.JWT_SECRET_PASS,
            {expiresIn: '24h'}
        )
        const { password: _, ...userWithoutPassword } = userdata._doc;
        res.status(200)
        .json({
            message:"Login Successfully",
            success:true,
            jwttoken,
            user: userWithoutPassword
        })
    }
    catch(error){
        res.status(500)
        .json({
            message:"Server Error",
            success:false
        })
    }
}


export const updateProfile = async (req, res) => {
    try {
      const userId = req.user._id;
      const { fname,lname   ,picture, email, password } = req.body;
  
      // Construct the updates object
      const updates = {};
  
      // Update UserName fields
 
        if (fname) updates.fname = fname;
        if (lname) updates.lname = lname;
    
  
      
      // Update other fields
      
      if (email) updates.email = email;
      if (req.file) {
        updates.picture = req.file.filename; // or req.file.path if needed
      }
      // If password is provided, hash it before updating
      if (password) {
        updates.password = await bcryptjs.hash(password, 10);
      }
  
      // Update user in the database
      const updatedUser = await UserModel.findByIdAndUpdate(userId, updates, { new: true, runValidators: true });
  
      // Check if the user exists
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found", success: false });
      }
  
      const { password: _, ...userWithoutPassword } = updatedUser._doc;
      // Respond with the updated user data
      res.status(200).json({
        message: "Profile updated successfully",
        success: true,
        user: userWithoutPassword,

      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error", success: false });
    }
  };

  export const getProfile = async (req, res) => {
    try {
        const userId = req.user._id;
      console.log("User in req:", req.UserModel); // ✅ from JWT middleware
      const user = await UserModel.findById(userId);
      res.json({ user });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  