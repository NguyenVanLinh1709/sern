import userService from "../services/userServices";

const userControllers = {
  handleRegister: async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const userData = await userService.handleRegister(
      firstName,
      lastName,
      email,
      password
    );
    if (userData.errCode === 0) {
      return res.status(200).json({ userData });
    } else {
      return res.status(500).json({ message: userData.errMessage });
    }
  },

  handleDelete: async (req, res) => {
    const id = req.params.id;
    const userData = await userService.checkIdExist(id);
    if (userData) {
      await userService.deleteUser(id);
      return res.status(200).json({ message: "User was deleted" });
    } else {
      return res.status(400).json({ message: "User not found" });
    }
  },

  handleLogin: async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      return res.status(500).json({
        errCode: 3,
        errMessage: "Missing fields",
      });
    }
    const userData = await userService.handleUserLogin(email, password);
    return res.status(200).json(userData);
  },

  handleGetUsers: async (req, res) => {
    const userData = await userService.getUsers();
    return res.status(200).json(userData);
  },

  handleEditUsers: async (req, res) => {
    const userId = req.query.id;
    const dataUpdate = req.body;
    const isExitUserId = await userService.checkIdExist(userId);
    if (isExitUserId) {
      userService.getUserById(userId, dataUpdate);
      return res.send("Found");
    } else {
      return res.send("User not found");
    }
  },

  handleGetAllCodes: async (req, res) => {
    console.log("req", req.query.type);
    const allCodes = await userService.getAllCodes(req.query.type);
    return res.status(200).json(allCodes);
  },
};

export default userControllers;
