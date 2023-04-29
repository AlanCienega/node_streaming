const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.APP_PORT || 3000;

const publicDir = `${__dirname}/public`;
const distDir = `${__dirname}/dist`;

// listen on specified port
http.listen(port, () => {
  console.log(`Servidor iniciado en localhost: ${port}`);
});

// set up routes for different requests
app.get("/", (req, res) => {
  res.sendFile(`${publicDir}/client.html`);
});

app.get("/streaming", (req, res) => {
  res.sendFile(`${publicDir}/server.html`);
});

// setup css file for views
app.use(express.static(`${distDir}`));

// listen for incoming websocket connections
io.on("connection", (socket) => {
  // when a client sends a "streaming" event with an image, emit a "playStream" event with the image data to all connected clients
  socket.on("streaming", (image) => {
    io.emit("playStream", image);
  });
});
