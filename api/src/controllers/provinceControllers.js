const axios = require('axios');
const { Province } = require('../db');




// SAVE DATA FROM API TO DB ----> PROVINCES VERSION

const apiProvince = async(req, res) => {
	try {
		const apiProvinces = await axios(`https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre&max=24`);
		const getProvinces = apiProvinces.data.provincias;
		const savedProvinces = getProvinces.map(async(p) => {
			const provinces = await Province.findOrCreate({
				where: {
					id: p.id,
					nombre: p.nombre
				}
			})
		})
		console.log(`Provinces loaded successfully!`)
	} catch(error) {
		console.log(error);
	}
}



const getAllProvinces = async(req, res) => {
	try{
		const provinces = await Province.findAll();
		res.status(200).json(provinces);
	} catch(error) {
		res.status(200).json(`Error at getAllProvinces controller function: ${error}`)
	}
}




module.exports = { getAllProvinces, apiProvince }