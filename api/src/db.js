require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

//hola como va 
let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/bringit`,
        { logging: false, native: false }
      );

// const sequelize = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/dogs`,
//   {
//     logging: false, // set to console.log to see the raw SQL queries
//     native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//   }
// );
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const { Product, Category, Business, City, Province, Purchase, Confirmed } = sequelize.models;


// Aca vendrian las relaciones
Product.belongsToMany(Category, {through: "product_category"});
Category.belongsToMany(Product, {through: "product_category"});

Product.belongsToMany(Business, {through: "product_business"});
Business.belongsToMany(Product, {through: "product_business"});

City.hasMany(Business);
Business.belongsTo(City);

Province.hasMany(City);
City.belongsTo(Province);


// Esta relación cambia de 1 a N, a N a N y se regula con el stock
Purchase.belongsToMany(Product, {through: "purchase_product"});
Product.belongsToMany(Purchase, {through: "purchase_product"});

// Esta relación nos hace ruido pero no nos cierra ninguna otra alternativa mejor
Purchase.hasOne(Confirmed);
Confirmed.belongsTo(Purchase);

//Descomentar cuando este el modelo User creado e importado
//User.hasMany(Purchase);
//Purchase.belongsTo(User);

//Descomentar cuando este el modelo Travel creado e importado
//Confirmed.hasOne(Travel);
//Travel.belongsTo(Confirmed);








module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};