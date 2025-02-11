const express = require('express');
const userRouter = express.Router();
const multer = require('multer');
const { signIn, signUp, signOut, forgotPassword, newPassPhrase, updateProfilePhoto, updateProfile } = require('../Controller/auth');
const { verifyToken } = require('../Utils/VerifyToken');
const cloudinary = require('cloudinary').v2; 

const storage = multer.memoryStorage();

const upload = multer({storage:storage});


userRouter.post('/signUp', signUp);
userRouter.post('/signIn', signIn);
userRouter.get('/logout', signOut);
userRouter.post('/reset-pw', forgotPassword);
userRouter.post('/new-ph', newPassPhrase);
userRouter.post('/newProfilePhoto', verifyToken, updateProfilePhoto);
userRouter.put('/update-profile', verifyToken, updateProfile);
userRouter.post('/uploadProfilePhoto', verifyToken, upload.single('file'), async(req, res) => { 
    if (!req.file) { return res.status(400).send('No file uploaded'); } 
    try {
      const userId = req.user.userId;
      const user = await userModel.findById(userId);
      if (user.imageId) {
        await cloudinary.uploader.destroy(user.imageId);
      }
      const fileBuffer = req.file.buffer;
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({
          resource_type: 'image',
          upload_preset: 'CICD-pipeline',
          transformation: [
            {
              quality: 'auto',
              fetch_format: 'auto'
            },
            {
              width: '800',
              height: '800',
              crop: 'fill',
              gravity: 'auto'
            }
          ]
        }, (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }).end(fileBuffer);
      }); 

      user.imageId = result.public_id; // Store the new public_id
      await user.save();
      res.send({ filePath: result.secure_url });
    } catch (error) {
      console.error('Error uploading file to Cloudinary:', error);
      res.status(500).send('Upload to Cloudinary failed');
    }
});

module.exports = userRouter;