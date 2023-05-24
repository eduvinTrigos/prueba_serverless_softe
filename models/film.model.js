const { update_url } = require('./utils');

const films = (data) => {
  	return {
		"personajes": update_url(data['characters']),
		"creada": data['created'],
		"director": data['director'],
		"editada": data['edited'],
		"id_episodio": data['episode_id'],
		"rastreo_de_apertura": data['opening_crawl'],
		"planetas": update_url(data['planets']),
		"productor": data['producer'],
		"fecha_lanzamiento": data['release_date'],
		"especies": update_url(data['species']),
		"naves_estelares": update_url(data['starships']),
		"titulo": data['title'],
		"url": update_url(data['url']),
		"vehiculos": update_url(data['vehicles']),
  	};
};

module.exports = {
  	Get: films,
  	Get_total: (data) => {
		return {
			"total": data['count'],
			"siguiente": update_url(data['next']),
			"anterior": update_url(data['previous']),
			"resultados": data['results'].map((item) => {
				return films(item);
			}),
		};
	},
};