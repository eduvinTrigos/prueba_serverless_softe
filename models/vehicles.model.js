const { update_url } = require('./utils');

const vehicles = (data) => {
  	return {
		"name": data['name'],
		"model": data['model'],
		"manufacturer": data['manufacturer'],
		"cost_in_credits": data['cost_in_credits'],
		"length": data['length'],
		"max_atmosphering_speed": data['max_atmosphering_speed'],
		"crew": data['crew'],
		"passengers": data['passengers'],
		"cargo_capacity": data['cargo_capacity'],
		"consumables": data['consumables'],
		"vehicle_class": data['vehicle_class'],
		"pilots": update_url(data['pilots']),
		"films": update_url(data['films']),
		"created": data['created'],
		"edited":data['edited'],
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