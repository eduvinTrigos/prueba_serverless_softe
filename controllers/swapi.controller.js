const fetch = require('cross-fetch');
const models = {
  'people': require('../models/people.model'),
  'planets': require('../models/planets.model'),
  'films': require('../models/film.model'),
  'species': require('../models/species.model'),
  'starships': require('../models/starships.model'),
  'vehicles': require('../models/vehicles.model')
};

module.exports.swapi = async (req, type_data,data_id, page ) => {
  try {
    const headersList = {
      "Accept": "*/*",
    };
    
    const type_request={
        'people':"https://swapi.py4e.com/api/people/",
        'planets':"https://swapi.py4e.com/api/planets/",
        'films':"https://swapi.py4e.com/api/films/",
        'species':"https://swapi.py4e.com/api/species/",
        'vehicles':"https://swapi.py4e.com/api/vehicles/",
        'starships':"https://swapi.py4e.com/api/starships/"
    }

    if(type_request[type_data]== undefined){
        return {
            statusCode: 400, // Código de estado 400 Bad Request
            body: JSON.stringify({
              success: false,
              message: "Tipo de solicitud desconocido",
              data: null
            })
        };
    }

    let apiUrl = type_request[type_data];

    if (data_id != null ) {
      apiUrl += data_id;
    }

    if (page) {
      apiUrl += `?page=${page}`;
    }

    let response = await fetch(apiUrl, {
        method: "GET",
        headers: headersList
    });

    const statusCode = response.status;
    const responseData = await response.json();
   
    if (response.ok) {
      if (data_id && data_id !== '') {
        return {
          statusCode,
          body: JSON.stringify({
            success: true,
            message: "Película obtenida exitosamente",
            data: models[type_data].Get(responseData)
          })
        };
      } else {
        return {
          statusCode,
          body: JSON.stringify({
            success: true,
            message: "Película obtenida exitosamente",
            data: models[type_data].Get_total(responseData)
          })
        };
      }
    } else {
      console.error('Error en la respuesta de la API:', statusCode);
      return {
        statusCode,
        body: JSON.stringify({
          success: false,
          message: "Error en la respuesta de la API"
        })
      };
    }
  } catch (error) {
    console.error('Error al obtener la película:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: "Error al obtener la película",
        error: error
      })
    };
  }
};