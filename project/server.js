const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Public folder for images
app.use('/images', express.static('public/images'));

// Routes
const hallsRoutes = require("./routes/halls");
app.use("/api/halls", hallsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
