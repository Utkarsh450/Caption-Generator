const express = require("express");

const router = express.Router();
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.models");
const authMiddlware = require("../middlewares/auth.middlewares");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", authMiddlware,upload.single("image"), createPostController)

module.exports = router;