const { Product, User, Business, Category, Businessbranch, City } = require('./../db');
const users = require('./user.json');
const categories = require('./category.json');
const businesses = require('./business.json');
const products = require('./products.json');
const businessbranch = require('./businessbranch.json');

const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');


async function loadDB (){
    const usersLoad = users.forEach( async (u) => {
      await User.findOrCreate({
        where: {
          email: u.email,
          password: CryptoJS.AES.encrypt(u.password, process.env.PASS_SEC).toString(),
          name: u.name,
          lastname: u.lastname,
          birthDate: u.birthDate,
          age: u.age
        }
      })
    }) ;
    console.log('Users saved successfully') ;
    const categoryLoad = categories.forEach( async (c) => {
      await Category.findOrCreate({
        where: {
          name: c.name
        }
      })
    }) ;
    console.log('Categories saved successfully') ;
    const businessesLoad = businesses.forEach( async (b) => {
      await Business.findOrCreate({
        where: {
          email: b.email,
          password: CryptoJS.AES.encrypt(b.password, process.env.PASS_SEC).toString(),
          businessName: b.businessName,
          cuit: b.cuit,
          taxBracket: b.taxBracket,
        }
      })
    }) ;
    const businessesbranchLoad = businessbranch.forEach( async (b) => {      
      await Businessbranch.findOrCreate({
        where: {
          businessEmail: b.businessEmail,           
          businessBranchName: b.businessBranchName,           
          province: b.province,
          address: b.address,
          cityId: b.cityId
        }
      })
    }) ;
    console.log('Businessbranches saved successfully') ;
    const productsLoad = products.forEach( async (p) => {
         const newProduct = await Product.findOrCreate({
            where: {
              name: p.name,
              price: p.price,
              weight: p.weight,
              image: p.image,
              stock: p.stock,
              description: p.description,
              businessbranchId: p.businessbranchId
            }
          })
          const newProduct2 = await Product.findByPk(newProduct[0].dataValues.id);
          await newProduct2.addCategory(p.categoryId);
      })
     ;
    console.log('Products saved successfully') ;
  }

  module.exports = {
    loadDB
};