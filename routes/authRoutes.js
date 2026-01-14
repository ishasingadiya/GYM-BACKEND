const express = require("express");
const router = express.Router();

const {
  sendResetOTP,
  resetPassword
} = require("../controllers/authController");

router.post("/send-reset-otp", sendResetOTP);
router.post("/reset-password", resetPassword);

module.exports = router;
