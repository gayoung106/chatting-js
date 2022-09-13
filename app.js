const express = require("express");
const http = require("http");
const app = express();
const path = require("path");
const server = http.createServer(app);
//server안에 app을 담아서 궁극적으로 express가 http를 통해서 실행될 수 있도록

const socketIO = require("socket.io");
const io = socketIO(server);

app.use(express.static(path.join(__dirname, "src")));
const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
  console.log("연결됨");
});

server.listen(PORT, () => console.log(`server is running ${PORT}`));
