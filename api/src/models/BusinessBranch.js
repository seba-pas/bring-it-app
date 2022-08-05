const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "businessbranch",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      businessBranchName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      province: {
        type: DataTypes.STRING,
        allowNull: false
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
      },
      //cityId no va definida aca, se vincula en las relaciones (archivo db.js)
    },
    {
        timestamps: false
    }
  );
};