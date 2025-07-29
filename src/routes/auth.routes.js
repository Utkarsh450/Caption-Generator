const express = require("express");
const router = require("express").Router();
const authController = require("../controllers/auth.controller");

// POST /register api

router.post("/register", authController.registerController);

// POST /login api
router.post("/login", authController.loginController);

// /api/posts {image-file} [protected]

module.exports = router;
