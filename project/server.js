const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Public images serving
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(cors());
app.use(bodyParser.json());

// Routes
const hallsRoutes = require("./routes/halls");
app.use("/api/halls", hallsRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
