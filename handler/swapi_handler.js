
"use strict";
const { swapi } = require("../controllers/swapi.controller");

module.exports.swapis = async (event) => {

    const type_data = (event.pathParameters && event.pathParameters.type_data)?event.pathParameters.type_data:null;
    const  id_data = (event.pathParameters && event.pathParameters.id_data)?event.pathParameters.id_data:null;
    const page = event.queryStringParameters && event.queryStringParameters.page ? event.queryStringParameters.page : null;
    const response = await swapi(event, type_data, id_data, page );
    return response;
};
