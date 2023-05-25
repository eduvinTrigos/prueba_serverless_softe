const { update_url } = require('./utils');

const vehicles = (data) => {
  	return {
		"nombre": data['name'],
		"modelo": data['model'],
		"fabricante": data['manufacturer'],
		"coste_en_créditos": data['cost_in_credits'],
		"longitud": data['length'],
		"velocidad_máxima_atmosférica": data['max_atmosphering_speed'],
		"tripulacion": data['crew'],
		"pasajeros": data['passengers'],
		"capacidad_de_carga": data['cargo_capacity'],
		"consumibles": data['consumables'],
		"clase_vehiculo": data['vehicle_class'],
		"pilotos": update_url(data['pilots']),
		"peliculas": update_url(data['films']),
		"creado": data['created'],
		"editado":data['edited'],
		"url":update_url(data['url'])
  	};
};

module.exports = {
    Get: vehicles,
    Get_total: (data) => {
		return {
			"total": data['count'],
			"siguiente": update_url(data['next']),
			"anterior": update_url(data['previous']),
			"resultados": data['results'].map((item) => {
				return vehicles(item);
			}),
		};
	},
};