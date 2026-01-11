const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../utils/s3');

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'application/pdf'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPEG, PNG, PDF allowed'), false);
  }
};

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, `admin-documents/${Date.now()}-${file.originalname}`);
    }
  }),
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // max 5MB per file
});

module.exports = upload;
