//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { db } = require('./src/db');
const { apiCity } = require('./src/controllers/cityControllers')
const { apiProvince } = require('./src/controllers/provinceControllers')
const { loadDB } = require('./src/json/jsonControllers')
// const municipios = json1.municipios;
//todo CHAT V1.0 ------------------------------------------
const { Server } = require("socket.io");
const http = require("http");
const serverChat = http.createServer(server);

const io = new Server(serverChat, {
  // cors: {
    // origin: "http://localhost:3000",
  // },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  socket.on("message", (message) => {
    console.log("message", message)
    socket.broadcast.emit(`${message.split("/")[0]}`, {

      body: message.split("/")[1],
      from: socket.from,
    });
  });
  /* socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  }); */
});
//TODO------------------------------------------------------
// // Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(process.env.PORT || 3001, async () => {
    await apiProvince();
    await apiCity();
    await loadDB();
    console.log("BRING IT ON! Listening..."); // eslint-disable-line no-console
  });
});
