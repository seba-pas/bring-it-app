const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
<<<<<<< HEAD:api/src/models/Category.js
    "category",
=======
    "Category",
>>>>>>> d3ad13e8968a0b601ee63119b42baa3a957390d5:api/src/models/Dogs.js
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