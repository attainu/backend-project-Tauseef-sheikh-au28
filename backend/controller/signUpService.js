const userDetails = require("../models/userSchema");
const bcrypt = require("bcrypt");

class Register {
  create = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!email) {
        throw { message: "email is required" };
      }
      const findUser = await userDetails.find({ email });

      if (findUser.length > 0) {
        throw { message: "email is already exist" };
      }

      const passwordHash = bcrypt.hashSync(password, 10);

      const result = await userDetails.create({
        name,
        email,
        password: passwordHash,
      });

      const response = {
        id:result._id,
        name: result.name,
        email: result.email,
      }
      return res.status(201).send({
        message: "Sign Up Successfully",
        error: false,
        data: response,
      });
    } catch (error) {
      return res.status(400).send({ message: error.message, error: true });
    }
  };
}

module.exports = new Register();
