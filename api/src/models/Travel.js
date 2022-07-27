const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "travel",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
     travelProvince: {
      type: DataTypes.STRING,
      allowNull: false
    },       
      arrivalProvince: {
        type: DataTypes.STRING,
        allowNull: false
      },     
      startDate: {
          type: DataTypes.DATEONLY, 
          allowNull: false
      },
      arrivalDate: {
        type: DataTypes.DATEONLY, 
        allowNull: false
    },
    },
    {
        timestamps: false
    }
  );
};