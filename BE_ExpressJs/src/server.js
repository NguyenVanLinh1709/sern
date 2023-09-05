import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import testConnection from "./config/connectDB";
import cookieParser from "cookie-parser";

const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

viewEngine(app);
initWebRoutes(app);

testConnection();

app.listen(port, () => {
  console.log("listening on port " + port);
});
