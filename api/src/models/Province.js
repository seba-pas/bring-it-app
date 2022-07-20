const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
<<<<<<< HEAD
<<<<<<< HEAD:api/src/models/Province.js
    "province",
=======

    "City",

>>>>>>> d3ad13e8968a0b601ee63119b42baa3a957390d5:api/src/models/City.js
=======

    "Province",

>>>>>>> d3ad13e8968a0b601ee63119b42baa3a957390d5
    {
      id: {
        type: DataTypes.STRING, //asi viene de la API del gobierno
        allowNull: false,
        primaryKey: true,        
      },
<<<<<<< HEAD
<<<<<<< HEAD:api/src/models/Province.js
      name: {
        type: DataTypes.STRING,
        allowNull: false,
=======

      name: {
        type: DataTypes.STRING,
        allowNull: false,

>>>>>>> d3ad13e8968a0b601ee63119b42baa3a957390d5:api/src/models/City.js
=======
      name: {
        type: DataTypes.STRING,
        allowNull: false,
>>>>>>> d3ad13e8968a0b601ee63119b42baa3a957390d5
      },     
    },
    {
        timestamps: false
    }
  );
};