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


// // Syncing all the models at once.

conn.sync({ force: false }).then(() => {
  server.listen(process.env.PORT || 3001, async () => {
    await apiProvince();
    await apiCity();
    await loadDB();
    console.log("BRING IT ON! Listening..."); // eslint-disable-line no-console
  });
});
