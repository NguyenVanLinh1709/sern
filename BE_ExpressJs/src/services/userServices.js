import db from "../models/index";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userService = {
  checkEmailExist: async (email) => {
    const user = await db.User.findOne({ where: { email: email } });
    if (user) {
      return user;
    } else {
      return null;
    }
  },

  checkIdExist: async (id) => {
    const userFound = await db.User.findOne({ where: { id: id } });
    return userFound;
  },

  deleteUser: async (id) => {
    await db.User.destroy({ where: { id: id } });
  },

  handleRegister: (firstName, lastName, email, password) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userData = {};
        if (await userService.checkEmailExist(email)) {
          userData.errCode = 1;
          userData.errMessage = "Email already registered";
        } else {
          userData.errCode = 0;
          userData.info = await db.User.create({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
          });
        }
        resolve(userData);
      } catch (error) {
        reject(error);
      }
    });
  },

  handleUserLogin: (email, password) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userData = {};
        const user = await userService.checkEmailExist(email);
        if (user) {
          const isPasswordMatch = await bcrypt.compare(password, user.password);
          if (isPasswordMatch) {
            const token = jwt.sign(user.id, "mk");
            userData.errCode = 0;
            userData.token = token;
          } else {
            userData.errCode = 2;
            userData.errMessage = "Wrong password";
          }
        } else {
          userData.errCode = 1;
          userData.errMessage = "Your email isn't exist";
        }
        resolve(userData);
      } catch (error) {
        reject(error);
      }
    });
  },
};

export default userService;