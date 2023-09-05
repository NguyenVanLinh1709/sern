import db from "../models/index";

const getHomePage = async (req, res) => {
  try {
    const data = await db.User.findAll();
    console.log("===>  file: homeController.js:6  data:", data);
  } catch (error) {
    console.log("===>  file: homeController.js:8  error:", error);
  }
  return res.send("Hello conyroller");
};

module.exports = {
  getHomePage: getHomePage,
};
