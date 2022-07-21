const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "confirmed",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      status: {
        type: DataTypes.ENUM(["En espera de compra", "Compra confirmada", "En viaje para entrega", "Entregado"]),
        allowNull: true,
      },  
    },  
    {
        timestamps: false
    }
  );
};