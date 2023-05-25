"use strict";
const { list, view, create, update, remove } = require("../controllers/personaje.controller");

module.exports.list = async () => {
    try {
        const personajes = await list();
        return {
            statusCode: personajes.statusCode,
            body: JSON.stringify(personajes.body),
        }
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};

module.exports.view = async (event) => {
    try {
        const { id_personaje } = event.pathParameters;
        const personaje = await view(id_personaje);
        return {
            statusCode: personaje.statusCode,
            body: personaje.body,
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: error.statusCode || 500,
            body: JSON.stringify({ error: error.message || 'Internal Server Error' }),
        };
    }
};

module.exports.create = async (event) => {
    try {
        const { body } = event;
       
        const newPersonaje = await create(JSON.parse(body));
        return {
            statusCode: newPersonaje.statusCode,
            body: newPersonaje.body,
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};

module.exports.update = async (event) => {
    try {
        const { id_personaje } = event.pathParameters;
        const { body } = event;
        const updatedPersonaje = await update(id_personaje, JSON.parse(body));
  
        return {
            statusCode: updatedPersonaje.statusCode,
            body: updatedPersonaje.body,
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};


module.exports.delete = async (event) => {
    try {
        
        const deletePersonaje = await remove(event);
        return {
            statusCode: deletePersonaje.statusCode,
            body: deletePersonaje.body,
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};