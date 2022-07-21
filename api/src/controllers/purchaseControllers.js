const axios= require ("axios");
const { Router } = require('express');
const {Purchase, Product, User} = require('../db');


async function getPurchase (){
    const purchase= await Purchase.findAll({
        include: [{model: User}, {model: Product}]        
    });
    return purchase;
};

module.exports = {
    getPurchase
};
