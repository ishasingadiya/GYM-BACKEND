const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const cloudinary = require('../config/cloudinary');
const auth = require('../middleware/auth'); // JWT verification

// Upload multiple documents
router.post(
  '/upload-docs',
  auth, // protect route
  upload.fields([
    { name: 'adhar', maxCount: 1 },
    { name: 'pan', maxCount: 1 },
    { name: 'lightBill', maxCount: 1 },
    { name: 'gumasta', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      if (!req.files) {
        return res.status(400).json({ message: 'No files uploaded' });
      }

      const uploadResults = {};

      for (const key in req.files) {
        const file = req.files[key][0];
        const result = await cloudinary.uploader.upload_stream(
          { resource_type: 'auto', folder: 'gym_docs' },
          (error, result) => {
            if (error) throw error;
            uploadResults[key] = result.secure_url;
          }
        );

        // Pipe buffer to upload_stream
        require('streamifier').createReadStream(file.buffer).pipe(result);
      }

      res.status(200).json({
        message: 'Documents uploaded successfully',
        data: uploadResults,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Upload failed', error: err.message });
    }
  }
);

module.exports = router;
