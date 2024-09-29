import express from "express";
import DBcon from "./utils/db.js";
import AuthRoutes from "./routes/Auth.js";
import cookieParser from "cookie-parser";
import BlogRoutes from "./routes/Blog.js";
import DashBoardRoutes from "./routes/Dashboard.js";
import commentRoutes from "./routes/Comments.js";
import PublicRoutes from "./routes/Public.js";
const app = express();
const PORT = 3000;
DBcon();
app.use(cookieParser());
app.use(express.json()); // to send json data through api
app.use(express.static("public"));
app.use("/auth", AuthRoutes);
app.use("/blog", BlogRoutes);
app.use("/dashboard", DashBoardRoutes);
app.use("/comment", commentRoutes);
app.use('/public', PublicRoutes)
app.listen(PORT, () => {
  console.log(`app is running on port : ${PORT}`);
});
