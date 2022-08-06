const { Product, User, Business, Category, Businessbranch, City, Travel, Purchase , Purchaseitem} = require('./../db');
const users = require('./user.json');
const categories = require('./category.json');
const businesses = require('./business.json');
const products = require('./products.json');
const businessbranch = require('./businessbranch.json');
const purchases = require('./purchase.json');
const travels = require('./travel.json');

const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');


async function loadDB (){
  const foundProduct = await User.findByPk("agustina@gmail.com");
  if (!foundProduct) {
    const usersLoad = users.forEach( async (u) => {
      await User.findOrCreate({
        where: {
          email: u.email,
          password: CryptoJS.AES.encrypt(u.password, process.env.PASS_SEC).toString(),
          name: u.name,
          lastname: u.lastname,
          birthDate: u.birthDate,
          isAdmin: u.isAdmin,
          phone: u.phone
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
          phone: b.phone
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
    const travelLoad = travels.forEach( async (t) => {     
      await Travel.findOrCreate({
        where: {
          userEmail: t.userEmail,
          travelProvince: t.travelProvince,
          travelCityId: t.travelCityId,
          arrivalProvince: t.arrivalProvince,
          arrivalCityId: t.arrivalCityId,
          startDate: t.startDate,
          arrivalDate: t.arrivalDate
        }
      })
    }) ;
    console.log('Travels saved successfully') ;
    const purchaseLoad = purchases.forEach( async (p) => {     
      const createdPurchase = await Purchase.findOrCreate({
        where: {
          totalPrice: p.totalPrice,
          maxDeliveryDate: p.maxDeliveryDate,
          arrivalCityId: p.arrivalCityId,
          province: p.province,
          userEmail: p.userEmail,
        }})
        const addItems = p.items.forEach(async (i) => {
          await Purchaseitem.findOrCreate({
            where: {
            purchaseId: createdPurchase[0].id,
            productId: i.id,
            quantity: i.quantity,
            }
          });
    }) 
  }); console.log('Purchases saved successfully') ;
} else {console.log('Db already loaded')}
} 

  module.exports = {
    loadDB
};