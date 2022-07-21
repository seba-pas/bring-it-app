const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        primaryKey: true,  
        autoincrement: true      
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
    },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },     
      lastname: {
          type: DataTypes.STRING,
          allowNull: false
      }, 
      age: {
          type: DataTypes.INTEGER, 
          allowNull: false
      },
      nationality: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    review: {
        type: DataTypes.STRING // DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.STRING))
    },
    },
    {
        timestamps: false
    }
  );
};