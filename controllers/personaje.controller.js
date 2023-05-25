const personaje_model = require('../models/personaje.model');
const Joi = require('joi');


module.exports.list = async () => {
    try {
        const personajes = await personaje_model.findAll();
        return {
            statusCode: 200,
            body: JSON.stringify(personajes),
        }
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Ocurrió un error en el servidor' }),
        };
    }
};
  
module.exports.view = async (id_personaje) => {
    try {
        const personaje = await personaje_model.findByPk(id_personaje);
        if (!personaje) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'El personaje no existe' }),
            };
        }
        return {
            statusCode: 200,
            body: JSON.stringify(personaje),
        }
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Ocurrió un error en el servidor' }),
        };
    }
};
const validatePersonaje = (data) => {
    const schema = Joi.object({
        per_name: Joi.string().required(),
        per_last_name: Joi.string().required(),
        per_age: Joi.number().integer().min(0).required(),
        per_gender: Joi.string().required(),
        per_description: Joi.string().required(),
        per_skills: Joi.string().required()
    });

    return schema.validate(data);
};
module.exports.create = async (data) => {
    try {
        // Validar los parámetros
        const { error } = validatePersonaje(data);
        if (error) {
            const errors = error.details.map(detail => detail.message);
            return {
                statusCode: 400,
                body: JSON.stringify({ errors })
            };
        }
        // Crear el personaje en la base de datos
        const newPersonaje = await personaje_model.create({
            per_name:data['per_name'],
            per_last_name:data['per_last_name'],
            per_age:data['per_age'],
            per_gender:data['per_gender'],
            per_description:data['per_description'],
            per_skills:data['per_skills'],
            per_date_create: new Date(),
            per_date_update: new Date(),
            per_status: 1
        });
  
        // Retornar la respuesta exitosa
        return {
            statusCode: 201,
            body: JSON.stringify(newPersonaje),
        };
    } catch (error) {
        // Manejar errores
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Ocurrió un error en el servidor' }),
        };
    }
};

const personajeUpdateSchema = Joi.object({
    per_name: Joi.string().optional().trim().label('Nombre del personaje'),
    per_last_name: Joi.string().optional().trim().label('Apellido del personaje'),
    per_age: Joi.number().integer().min(0).optional().label('Edad del personaje'),
    per_gender: Joi.string().optional().trim().label('Género del personaje'),
    per_description: Joi.string().optional().trim().label('Descripción del personaje'),
    per_skills: Joi.string().optional().trim().label('Habilidades del personaje')
}).min(1); // Al menos un campo debe estar presente en la actualización

module.exports.update = async (id_personaje, body) => {
    try {
        const personaje = await personaje_model.findByPk(id_personaje);
        if (!personaje) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'El personaje no existe' }),
            };
        }
        const { error, value } = personajeUpdateSchema.validate(body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((detail) => detail.message);
            return {
                statusCode: 400,
                body: JSON.stringify({ errors }),
            };
        }
        const updatedFields = {
            per_name: value.per_name || personaje.per_name,
            per_last_name: value.per_last_name || personaje.per_last_name,
            per_age: value.per_age || personaje.per_age,
            per_gender: value.per_gender || personaje.per_gender,
            per_description: value.per_description || personaje.per_description,
            per_skills: value.per_skills || personaje.per_skills,
            per_date_update: new Date(),
        };
        const affectedRows = await personaje.update(updatedFields);
        if (affectedRows === 0) {
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'No se realizaron cambios en el personaje' }),
            };
        }
        return {
            statusCode: 200,
            body: JSON.stringify(personaje),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Ocurrió un error en el servidor' }),
        };
    }
};
  
module.exports.remove = async (req, res) => {
    try {
        console.log(req)
        // Obtener el ID del personaje a eliminar
        const { id_personaje } = req.pathParameters;
        // Validar si el personaje existe
        const personaje = await personaje_model.findByPk(id_personaje);
        if (!personaje) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'El personaje no existe' }),
            };
        }
        const destroyCount = await personaje.destroy();
        if (destroyCount === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'El personaje no existe' }),
            };
        }
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'El personaje ha sido eliminado correctamente' }),
        };
    } catch (error) {
        // Manejar errores
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Ocurrió un error en el servidor' }),
        };
    }
};