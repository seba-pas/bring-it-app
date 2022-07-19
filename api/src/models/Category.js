const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "category",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },  
      //incluyo imagen x si la necesitan para el listado de categorias del front    
      image: {
        type: DataTypes.TEXT,
        allowNull: true,
      }      
    },
    {
        timestamps: false
    }
  );
};