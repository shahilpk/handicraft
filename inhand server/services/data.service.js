const db = require("./db");

// import jsonwebtoken
const jwt = require("jsonwebtoken");

const login = (username, password) => {
  return db.Inhand.findOne({
    username,
    password,
  }).then((result) => {
    console.log(result);
    if (result) {
      const token = jwt.sign(
        {
          currentName: username,
        },
        "secretkey12345"
      );

      return {
        message: "login successfull",
        status: true,
        statusCode: 200,
        name: result.username,
        token,
        currentName: username,
      };
    } else {
      return {
        message: "Invalid username / password!!",
        status: false,
        statusCode: 404,
      };
    }
  });
};
// register page

const register = (name, username, email, password) => {
  return db.Inhand.findOne({
    username,
  }).then((result) => {
    if (result) {
      return {
        message: "Already Existing user please login",
        status: false,
        statusCode: 404,
      };
    } else {
      let newUser = new db.Inhand({
        username,
        name,
        password,
        email,
      });
      newUser.save();
      return {
        message: "Registered Successfully",
        status: true,
        statusCode: 200,
      };
    }
  });
};

// get all products from db

const getProducts = () => {
  return db.Product.find().then((result) => {
    if (result) {
      return {
        status: true,
        statuscode: 200,
        products: result,
      };
    } else {
      return {
        status: false,
        statuscode: 404,
        message: "No product found",
      };
    }
  });
};


module.exports = {
  getProducts,
  login,
  register,
};
