const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

  sequelize.define(
    "business",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      //razón social
      businessName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cuit: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      //categoría tributaria
      taxBracket: {
        type: DataTypes.ENUM(["Categoría tributaria 1", "Categoría tributaria 2", "Categoría tributaria 3"]),
        allowNull: true,
      },
      logo: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      phone: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
      },      
    },
    {
        timestamps: true,
        createdAt: false,
        updatedAt: "Last update"
    }
  );
};