const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "purchase",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      maxDeliveryDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },     
    },
    {
        timestamps: true,
        createdAt: false,
        updatedAt: "Last update"
    }
  );
};