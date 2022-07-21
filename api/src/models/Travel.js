const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Travel",
    {
      id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoincrement: true      
      },
    TravelProvince: {
      type: DataTypes.STRING,
      allowNull: false
    },     
      TravelCity: {
        type: DataTypes.STRING,
        allowNull: false
      },     
      ArrivalProvince: {
        type: DataTypes.STRING,
        allowNull: false
      },     
      ArrivalCity: {
          type: DataTypes.STRING,
          allowNull: false
      }, 
      startDate: {
          type: DataTypes.DATEONLY, 
          allowNull: false
      },
      ArrivalDate: {
        type: DataTypes.DATEONLY, 
        allowNull: false
    },
    },
    {
        timestamps: false
    }
  );
};