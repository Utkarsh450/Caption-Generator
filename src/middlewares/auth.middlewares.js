const express = require("express");
const userModel = require("../models/user.models");
const jwt = require("jsonwebtoken");

async function authMiddlware(req, res, nexy) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // it gives the data stored in the token
    const user = await userModel.findOne({ _id: decoded.id });
    req.user = user; // Attach user to request object
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = authMiddlware;
