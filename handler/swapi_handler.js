
"use strict";
const { swapi } = require("../controllers/swapi.controller");

module.exports.swapis = async (event) => {

    const type_data = (event.pathParameters && event.pathParameters.type_data)?event.pathParameters.type_data:null;
    const  parameter_people = (event.pathParameters && event.pathParameters.parameter_people)?event.pathParameters.parameter_people:null;
    const page = event.queryStringParameters && event.queryStringParameters.page ? event.queryStringParameters.page : null;
    const response = await swapi(event, parameter_people, page, type_data);
    return response;
};
