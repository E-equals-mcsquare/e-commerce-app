import express from "express";

const app = express();
require("dotenv").config();
import cors from "cors";
// import routes from "./routes";

app.use(express.json());
const port = process.env.PORT;
app.use(
  cors({
    origin: [`http://localhost:3001`],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(cors());

// app.use("/user-service", routes);
app.get("/", (req, res) => {
  res.send(`User Service is running at port ${port}`);
});

app.listen(port, () => {
  console.log(`User Service is running at port ${port}`);
});
