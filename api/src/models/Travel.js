const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Travel",
    {
      id: {
        type: DataTypes.STRING, 
        allowNull: false,
        primaryKey: true,  
        autoincrement: true      
      },
      idUser: {
        type: DataTypes.INTEGER,
    },
      IdTravelCity: {
        type: DataTypes.INTEGER,
        // references: {
        //     model: City , 
        //     key: 'id'
        // }
      },     
      idArrivalCity: {
          type: DataTypes.INTEGER
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