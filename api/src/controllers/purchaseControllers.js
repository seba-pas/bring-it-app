const axios= require ("axios");
const { Router } = require('express');
const {Purchase, Product, User, Purchaseitem} = require('../db');


async function getPurchase() {
    const purchase = await Purchase.findAll({
        include: [{model: User}, {model: Purchaseitem}]        
    });
    if (purchase) {
        return purchase;        
    } else {
        return 'No HAY PURCHASE';
    }
};


module.exports = {
    getPurchase
};
