// Define all the dependencies
const express = require('express');

const mongoose = require('mongoose'); 
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware 
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Serve up static assets (applies to heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.statuc("client/build"));
}

// Add API and view routes
app.use(routes);

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/googlebooks";

// Connect to MongoDB 
mongoose.connect(MONGODB_URI)

// Start the API server
app.listen(PORT, function() {
    console.log(`API Server now listening on PORT ${PORT}`);
}