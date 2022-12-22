const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.users;
const {
  loginValidation,
  registerValidation,
} = require("../validation/authValidation");

router.post("/login", async (req, res) => {
  const validation = loginValidation(req.body);

  if (validation) {
    return res.status(400).send({
      status: false,
      message: validation.message,
      data: null,
    });
  }

  const user = await User.findOne({ email: req.body.email });
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
      return res.send({
        status: false,
        message: "Login Success",
        data: {
          user: {
            name: user.name,
            email: user.email,
          },
          token: token,
        },
      });
    }
  }

  return res.status(400).send({
    status: false,
    message: "Email or Password not Valid",
    data: null,
  });
});

router.post("/register", async (req, res) => {
  const validation = registerValidation(req.body);

  if (validation) {
    return res.status(400).send({
      status: false,
      message: validation.message,
      data: null,
    });
  }

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).send({
      status: false,
      message: "Email Already Exist",
      data: null,
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  user
    .save()
    .then((result) => {
      res.send({
        status: true,
        message: "Success to Register",
        data: {
          user: {
            name: result.name,
            email: result.email,
          },
        },
      });
    })
    .catch((err) => {
      res.status(409).send({
        status: false,
        message: "Failed to Register",
        data: null,
      });
    });
});

module.exports = router;
