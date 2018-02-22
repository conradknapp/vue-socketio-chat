var app = require("express")();
var server = require("http").Server(app);
var io = require("socket.io")(server);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", socket => {
  // accepts emitted message from 'sendToServer' method
  socket.on("newMessage", message => {
    // emits received message to everyone on the chat
    io.emit("newMessage", message);
  });
});

const port = process.env.PORT || 3030;

server.listen(port, () => {
  console.log(`Listening on ${port}`);
});
