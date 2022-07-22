const axios = require('axios');
const { City, Province } = require('../db');



// SAVE DATA FROM API TO DB
const apiCity = async () => {
	try {
		const apiCities = await axios(`https://apis.datos.gob.ar/georef/api/municipios?campos=id,nombre,provincia&max=1814`);
		const getCities = apiCities.data.municipios;
		const saveCities = getCities.map(async(city) => {
			const cities = await City.findOrCreate({
				where: {
					id: city.id,
					nombre: city.nombre,
					provinceId: city.provincia.id
				},
			})
		})
		console.log(`Cities saved successfully!`)
	} catch(error) {
		console.log(`Error at apiInfo function: ${error}`);
	}
}




const getAllCities = async(req, res) => {
	try {
		const cities = await City.findAll();
		res.status(200).json(cities)
	} catch(error) {
		res.status(500).send(`Error at getAllCities controller function: ${error}`);
	}
}



module.exports = { apiCity, getAllCities }