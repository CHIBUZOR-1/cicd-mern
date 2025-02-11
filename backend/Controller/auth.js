const bcrypt = require('bcryptjs');
const validator = require('validator');
const userModel = require('../Model/userModel');
const jwt = require('jsonwebtoken');
const { setCookiesWithToken } = require('../Utils/VerifyToken');


const signUp = async(req, res) => {
    try {
        const { username, passPhrase, email, password } = req.body;
        if(!username ||  !email || !password || !passPhrase) {
            return res.send({ success: false, message: "All fields required"});
        }
        const existsUsername = await userModel.findOne({username});
        if(existsUsername) {
            return res.json({
                success: false,
                message: "Username already in use"
            })
        }

        const existsEmail = await userModel.findOne({email});
        if(existsEmail) {
            return res.json({
                success: false,
                message: "Email already in use"
            })
        }
        // validating email format & password
        if(!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Enter a valid Email Address"
            })
        }
        if(password.length < 6) {
            return res.json({
                success: false,
                message: "Please enter a strong password"
            })
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, `${salt}`);
        const newUser = await new userModel({
            username,
            email,
            passPhrase,
            password: `${hashedPassword}`,
            verified: true
        }).save();
        res.status(201).json({
            success: true,
            error: false,
            message: "Registered sucessfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: true,
            message: "An error occurred!"
        })
    }
}

const signIn = async(req, res)=> {
    try {
        const { firstInput, password } = req.body;
        if(!firstInput || !password) {
            return res.status(400).send({success: false, message: "field required"})
        }
        const user = await userModel.findOne({ 
            $or: [
                { username: firstInput },
                { email: firstInput }
            ] 
        });
        if(!user) {
            return res.json({
                error: true,
                success: false,
                message: "User not found"
            })
        } 
        const matchedPassword = await bcrypt.compare(password, user.password);
        if(!matchedPassword) {
            return res.json({
                error: true,
                success: false,
                message: "Invalid password"
            });
        }
        setCookiesWithToken(user._id, res);
        const details = {
            id: user._id,
            username: user.username,
            email: user.email,
            profilePic: user.profileImg
        };
        res.status(200).json({
            success: true,
            message: "Login successful",
            details
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: true,
            message: "An error occurred!"
        })
    }
}
const signOut = async(req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0});
        res.cookie("socket", "", { maxAge: 0});
        res.status(200).json({
            success: true,
            message: "Logged Out successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: true,
            success: false,
            message: "An error occured!"
        })
    }
}

const newPassPhrase = async(req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if(!user) {
            res.status(400).json({
                ok: false,
                msg: 'No user found!'
            })
        }
        user.passPhrase = req.body.passPhrase;
        await user.save();
        res.status(201).json({
            ok: true,
            msg: 'Created successfully'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            error: true,
            message: "An error occurred!"
        });
    }
}

const forgotPassword = async(req, res) => {
    try {
        const { email, passPhrase, newPassword } = req.body;
        if(!email) {
            return res.status(400).send({ok:false, msg: "email required"});
        }
        if(!passPhrase) {
            return res.status(400).send({ok:false, msg: "answer required"});
        }
        if(!newPassword) {
            return res.status(400).send({ok:false, msg: "Password required"});
        }
        const user = await userModel.findOne({email});
        if(!user) {
            return res.json({
                ok: false,
                msg: "user not found!"
            })
        }
          // Compare the security answer
        const isMatch = bcrypt.compare(passPhrase, user.passPhrase);
        if (!isMatch) {
            return res.status(403).json({ ok: false, msg: 'Security answer is incorrect' });
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(newPassword, `${salt}`);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({
            ok: true,
            msg: "Password Reset Successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            error: true,
            msg: "An error occurred!"
        });
    }
}
const updateProfile = async(req, res)=> {
    try {
        const { eml, uname} = req.body;
        const user = await userModel.findByIdAndUpdate(req.user.userId, {
            email: eml,
            username: uname
        }, { new: true});
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: true,
            message: "An error occurred!"
        })
    }
}
const updateProfilePhoto = async (req, res) => {
    const { image } = req.body;
    const userId = req.user.userId; // Assuming you have userId from authentication middleware
  
    try {
      const user = await userModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      user.profileImg = image; // Update the profile photo URL
      await user.save();
  
      res.status(200).json({ success: true, message: 'Profile photo updated successfully', user });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };

module.exports = { signUp, signIn, signOut, newPassPhrase, forgotPassword, updateProfile, updateProfilePhoto }
