const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");
const config = require("../config/db.config.js");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  const { password } = req.body;
  encryptedPassword = await bcrypt.hash(password, 10);
  const addingData = {
    id: req.body.id,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: encryptedPassword,
    shopname: req.body.shopname,
    token: req.body.token,
    address: req.body.address,
    mobile: req.body.mobile,
  };
  console.log(addingData);
  const createdData = await User.create(addingData)
    .then((data) => {
      res.status(200).send({ message: "User Created Successfully" });
    })
    .catch((error) => {
      res.status(400).send({ message: "Went Wrong While Adding User" + error });
    });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userData = await User.findOne({ where: { email: email } });
    if (userData && (await bcrypt.compare(password, userData.password))) {
      // Create token
      const token = jwt.sign({ email: userData.email }, config.JWT_SECRET, {
        expiresIn: "2h",
      });
      // console.log("token--------"+token);
      // save user token
      const updatedToken = { token: token };
      const loginToken = await User.update(updatedToken, {
        where: { email: email },
      });
      if (loginToken) {
        res.status(200).send({ message: "Logged In And Token Updated" });
      } else {
        res.status(200).send({ message: "Went Wrong While Updating Token" });
      }
    }
    //  if(userData){
    //     res.status(200).send({message:"Logged In"});
    //  }
    else {
      res.status(400).send({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
};

const logoutController = async (req, res) => {
  const { email } = req.body;
  try {
    const updateData = {
      token: null,
    };
    const userData = await User.update(updateData, {
      where: { email: email },
    }).then((num) => {
      if (num == 1) {
        res.status(200).send({ message: "Logged Out" });
      } else {
        res.status(200).send({ message: "Went Wrong While Logged Out" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
};

module.exports = { createUser, loginController, logoutController };
