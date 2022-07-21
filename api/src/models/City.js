const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "City",
    {
      id: {
        type: DataTypes.STRING, //asi viene de la API del gobierno
        allowNull: false,
        primaryKey: true,        
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },     
    },
    {
        timestamps: false
    }
  );
};