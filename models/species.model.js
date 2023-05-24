const { update_url } = require('./utils');

const species = (data) => {
  	return {
		"name": data['name'],
		"classification": data['classification'],
		"designation": data['designation'],
		"average_height": data['average_height'],
		"skin_colors": data['skin_colors'],
		"hair_colors": data['hair_colors'],
		"eye_colors": data['eye_colors'],
		"average_lifespan": data['average_lifespan'],
		"homeworld":  update_url(data['homeworld']),
		"language":data['language'],
		"people": update_url(data['people']),
		"films": update_url(data['films']),
		"created": data['created'],
		"edited": data['edited'],
		"url": update_url(data['url'])
  	};
};

module.exports = {
    Get: species,
    Get_total: (data) => {
		return {
			"total": data['count'],
			"siguiente": update_url(data['next']),
			"anterior": update_url(data['previous']),
			"resultados": data['results'].map((item) => {
				return species(item);
			}),
		};
	},
};