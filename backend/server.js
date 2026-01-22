const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth"); // ✅ REQUIRED

const app = express();

app.use(cors());
// Increase request body size limit to 10MB
app.use(express.json({ limit: '10mb' }));

app.use("/api/auth", authRoutes);
app.use("/api/inventory", require("./routes/inventory"));
app.use("/api/sales", require("./routes/sales"));
app.use("/api/purchases", require("./routes/purchases"));
app.use("/api/analytics", require("./routes/analytics"));
app.use("/api/users", require("./routes/users"));
app.use("/api/customers", require("./routes/customers"));


app.get("/", (req, res) => {
  res.send("Backend working");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log(err));
