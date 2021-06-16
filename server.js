const express = require("express");
const app = express();
// const mysql = require("mysql");

app.set("view engine", "hbs"); // usually ejs, hbs used to access index.hbs file
app.use(express.static("public")); // we are using the public folder in our express server

app.get("/", (req, res) => {
  res.render("index");
});

const server = app.listen(3000, function () {
  console.log("Server is running on port 3000.");
});

const io = require("socket.io")(server);
// include socket.io

// socket = client
io.on("connection", (socket) => {
  socket.on("change_username", (data, res) => {
    socket.username = data.username;
    console.log("\n");
    console.log(socket.username, "is connected.");
  });
  socket.on("new_message", (data) => {
    io.sockets.emit("new_message", {
      message: data.message, // what is entered
      username: socket.username,
    });
  }); // listening to the emit event in chat.js
});
