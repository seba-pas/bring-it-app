const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
<<<<<<< HEAD
    "business",
=======
 DatabaseAgustina
    "Business",

>>>>>>> d3ad13e8968a0b601ee63119b42baa3a957390d5
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
        type: DataTypes.STRING,
        allowNull: true,
      },
      province: {
        type: DataTypes.STRING,
        allowNull: false
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      //cityId no va definida aca, se vincula en las relaciones (archivo db.js)
    },
    {
        timestamps: true,
        createdAt: false,
        updatedAt: "Last update"
    }
  );
};