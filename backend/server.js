import expres from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRoutetr from "./routes/user_route.js";
dotenv.config();
const port = process.env.PORT || 3000;
const app = expres();

app.use("/api/user", UserRoutetr);

mongoose
  .connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log("Database: Connected");
      console.log(`Server Port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
