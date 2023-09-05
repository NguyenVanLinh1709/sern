import userService from "../services/userServices";

const handleRegister = async (req, res) => {
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
};

const handleDelete = async (req, res) => {
  const id = req.params.id;
  const userData = await userService.checkIdExist(id);
  if (userData) {
    await userService.deleteUser(id);
    return res.status(200).json({ message: "User was deleted" });
  } else {
    return res.status(400).json({ message: "User not found" });
  }
};

const handleLogin = async (req, res) => {
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
};

module.exports = {
  handleLogin: handleLogin,
  handleRegister: handleRegister,
  handleDelete: handleDelete,
};
