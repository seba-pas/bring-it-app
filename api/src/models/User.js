const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
// function getAge(birthDate) {
//   var today = new Date();
//   var birthDate = new Date(birthDate);
//   var age = today.getFullYear() - birthDate.getFullYear();
//   var m = today.getMonth() - birthDate.getMonth();
//   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//       age--;
//   }
//   return age;
// }

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "user",
    {
      email: {
        type: DataTypes.STRING, 
        allowNull: false,
        primaryKey: true,  
        allowNull: true
      },
      password: {
        type: DataTypes.STRING,
        //allowNull: false
        allowNull: true //pongo true x la aut de google. Ver en un 2do paso si se puede traer esta info de google
    },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },     
      lastname: {
          type: DataTypes.STRING,
          allowNull: false
      }, 
      birthDate: {
          type: DataTypes.DATEONLY, 
          //allowNull: false
          allowNull: true //pongo true x la aut de google. Ver en un 2do paso si se puede traer esta info de google
      },
    review: {
        type: DataTypes.STRING, // DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.STRING))
        allowNull: true
    },
    // age: {
    //   type: DataTypes.INTEGER,
    //   set() {
    //     this.setDataValue('age', getAge(this.birthDate));
    //   }
    // },
    phone: {
      type: DataTypes.STRING,
      //allowNull: false
      allowNull: true //pongo true x la aut de google. Ver en un 2do paso si se puede traer esta info de google
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
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
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isBusiness: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true
    }

    },
    {
        timestamps: false
    }
  );
};