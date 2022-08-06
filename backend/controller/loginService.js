const jwt = require("jsonwebtoken");
const userDetails = require("../models/userSchema");
const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;
const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN;
const bcrypt = require("bcrypt");

class LoginService {
  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { message: "email is required" };
      }
      if (!password) {
        throw { message: "password is required" };
      }
      const findCredentials = await userDetails.find({ email });
      if (findCredentials.length == 0) {
        throw { message: "signUp is Required" };
      }

      if (bcrypt.compareSync(password, findCredentials[0].password)) {
        const userCookieData = {
          id: findCredentials[0]._id,
          name: findCredentials[0].name,
          email: findCredentials[0].email,
        };

        const access_token = jwt.sign(userCookieData, JWT_AUTH_TOKEN, {
          expiresIn: "1d",
        });
        const login_token = jwt.sign(userCookieData, JWT_REFRESH_TOKEN, {
          expiresIn: "30d",
        });
        return res
          .status(202)
          .header("access_token", access_token)
          .send({
            message: "LogIn Successfully",
            error: false,
            data: {
              id: findCredentials[0]._id,
              name: findCredentials[0].name,
              email: findCredentials[0].email,
              token: login_token,
            },
          });
      } else {
        throw { message: "password is wrong!" };
      }
    } catch (error) {
      return res.status(400).send({ message: error.message, error: true });
    }
  };
}

module.exports = new LoginService();
