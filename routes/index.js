const router = require("express").Router();
const api = require("./api");
const path = require("path");
// API Routes
router.use("/api", api);

// If no API routes are found, send React app page
router.use(function(req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });

module.exports = router; 