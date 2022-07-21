const axios= require ("axios");
const { Router } = require('express');
const { request } = require("http");
const {Purchase, Product, User} = require('../db');
const {getDbPedidos} = require('./purchaseControllers')


const pedidosByiD= async (req)=>{
    const {id}= req.params;
    let allPedidos= await getDbPedidos();
        if (id){
            let pedido= await allPedidos.filter(e=>e.id==id);
            if (pedido.length!==0) {
                return pedido;
            } else {
                return 'no se ecnontro el juego ';
            };
        }else{
            return 'ID invalido';
        }
}

module.exports={pedidosByiD, };