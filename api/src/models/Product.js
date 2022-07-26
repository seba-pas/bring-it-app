const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "product",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNul: true,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      weight: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0 // poner default value 0 
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      //businessId y categoryId no van definidas aca, se vinculan en las tablas intermedias: products_categories y products_business
    },
    {
        timestamps: true,
        createdAt: false,
        updatedAt: "Last update"
    }
  );
};