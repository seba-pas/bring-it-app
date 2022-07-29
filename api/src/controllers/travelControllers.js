const axios= require ("axios");
const { Router } = require('express');
const {User, Travel} = require('../db');


async function getTravel(){
    const travel = await Travel.findAll({
        include: [{model: User}]        
    });
    if (travel!== '') {
        return travel;        
    } else {
        return 'No HAY TRAVEL';
    }
};


module.exports = {
    getTravel
};