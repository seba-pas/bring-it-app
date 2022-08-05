const axios = require("axios");
const { Router } = require('express');

const { User, Travel, Purchase, City } = require('../db');

async function getTravel() {
    const travel = await Travel.findAll({
        include: [{ model: User }, {model: Purchase}]
    });
    if (travel !== '') {
        return travel;
    } else {
        return 'No se encontraron viajes asociados';
    }
};


module.exports = {
    getTravel
};