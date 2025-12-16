require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json({ status: "API working" });
});


app.use("/api/search", require("./routes/search"));
app.use("/api/recommend", require("./routes/recommend"));





app.listen(process.env.PORT, () =>
  console.log("Server running on port", process.env.PORT)
);
