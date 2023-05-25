const { update_url } = require('./utils');

const planets = (data) => {
  	return {
		"nombre": data['name'],
		"período_de_rotacion": data['rotation_period'],
		"periodo_orbital": data['orbital_period'],
		"diametro": data['diameter'],
		"clima": data['climate'],
		"gravedad": data['gravity'],
		"terreno": data['terrain'],
		"superficie_agua": data['surface_water'],
		"poblacion": data['population'],
		"residentes": update_url(data['residents']),
		"peloculas": update_url(data['films']),
		"creado": data['created'],
		"editado": data['edited'],
		"url": update_url(data['url']),
  	};
};

module.exports = {
    Get: planets,
    Get_total: (data) => {
		return {
			"total": data['count'],
			"siguiente": update_url(data['next']),
			"anterior": update_url(data['previous']),
			"resultados": data['results'].map((item) => {
				return planets(item);
			}),
		};
	},
};