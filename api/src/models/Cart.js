const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "cart",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      productId: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
      },  
      //incluyo imagen x si la necesitan para el listado de categorias del front    
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }      
    },
    {
        timestamps: false
    }
  );
};