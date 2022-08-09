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
const http=require("http");
const socketIO = require("socket.io");
const users=[{}];
server.get("/",(req,res)=>{
    res.send("HELL ITS WORKING");
})

const servidor= http.createServer(server);

const io=socketIO(servidor);

io.on("connection",(socket)=>{
    console.log("New Connection");

    socket.on('joined',({user})=>{
          users[socket.id]=user;
          console.log(`${user} has joined `);
          socket.broadcast.emit('userJoined',{user:"Admin",message:` ${users[socket.id]} has joined`});
          socket.emit('welcome',{user:"Admin",message:`Welcome to the chat,${users[socket.id]} `})
    })

    socket.on('message',({message,id})=>{
        io.emit('sendMessage',{user:users[id],message,id});
    })

    socket.on('desconectado',()=>{
          socket.broadcast.emit('leave',{user:"Admin",message:`${users[socket.id]}  has left`});
        console.log(`user left`);
    })
});

// // Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  servidor.listen(process.env.PORT || 3001, async () => {
    await apiProvince();
    await apiCity();
    await loadDB();
    console.log("BRING IT ON! Listening..."); // eslint-disable-line no-console
  });
});
