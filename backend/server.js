import expres from "express";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 3000;
const app = expres();

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
