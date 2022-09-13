const express = require("express");
const http = require("http");
const app = express();
const path = require("path");
const server = http.createServer(app);
//server안에 app을 담아서 궁극적으로 express가 http를 통해서 실행될 수 있도록
const socketIO = require("socket.io");
const moment = require("moment");

const io = socketIO(server);

app.use(express.static(path.join(__dirname, "src")));
const PORT = process.env.PORT || 5000;
//서버에서는 보내주는 내용까지만 구현
io.on("connection", (socket) => {
  socket.on("chatting", (data) => {
    const { name, msg } = data;
    io.emit("chatting", {
      name,
      msg,
      time: moment(new Date()).format("h:ss A"),
    });
  });
});

server.listen(PORT, () => console.log(`server is running ${PORT}`));
