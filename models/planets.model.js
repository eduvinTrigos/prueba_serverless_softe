const { update_url } = require('./utils');

const planets = (data) => {
  	return {
		"name": data['name'],
		"rotation_period": data['rotation_period'],
		"orbital_period": data['orbital_period'],
		"diameter": data['diameter'],
		"climate": data['climate'],
		"gravity": data['gravity'],
		"terrain": data['terrain'],
		"surface_water": data['surface_water'],
		"population": data['population'],
		"residents": update_url(data['residents']),
		"films": update_url(data['films']),
		"created": data['created'],
		"edited": data['edited'],
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