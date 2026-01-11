const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const protect = require('../middleware/auth');
const Admin = require('../models/Admin');

// Upload multiple documents
router.post(
  '/documents',
  protect,
  upload.fields([
    { name: 'adhar', maxCount: 1 },
    { name: 'pan', maxCount: 1 },
    { name: 'lightBill', maxCount: 1 },
    { name: 'gumasta', maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const admin = await Admin.findById(req.admin._id);

      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }

      admin.documents.adhar = req.files['adhar'][0].location;
      admin.documents.pan = req.files['pan'][0].location;
      admin.documents.lightBill = req.files['lightBill'][0].location;
      admin.documents.gumasta = req.files['gumasta'][0].location;

      await admin.save();

      res.status(200).json({
        message: 'Documents uploaded successfully',
        documents: admin.documents
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Upload failed', error: error.message });
    }
  }
);

module.exports = router;
