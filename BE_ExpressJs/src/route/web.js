import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

const hashPassword = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;
    next();
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.post("/register", hashPassword, userController.handleRegister);
  router.delete("/user/:id", userController.handleDelete);
  router.post("/login", userController.handleLogin);
  router.get("/users", userController.handleGetUsers);
  router.put("/user", hashPassword, userController.handleEditUsers);

  router.get("/allcodes", userController.handleGetAllCodes);

  router.get("/private", (req, res, next) => {
    try {
      const token = req.headers.authentication;
      const isTokenValid = jwt.verify(token, "mk");
      if (isTokenValid) {
        res.send("Token valid");
        next();
      }
    } catch (error) {
      res.send("Token invalid");
    }
  });

  return app.use("/", router);
};

module.exports = initWebRoutes;
