import expres from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import UserRoutetr from "./routes/user_route.js";
import AuthRouter from "./routes/auth_route.js";

const port = process.env.PORT || 3000;
const app = expres();

app.use(expres.json());

app.use("/api/user", UserRoutetr);
app.use("/api/auth", AuthRouter);

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
