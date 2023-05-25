const { update_url } = require('./utils');

const species = (data) => {
  	return {
		"nombre": data['name'],
		"clasificacion": data['classification'],
		"designacion": data['designation'],
		"altura_media": data['average_height'],
		"colores_de_piel": data['skin_colors'],
		"colores_de_pelo": data['hair_colors'],
		"colores_ojos": data['eye_colors'],
		"esperanza_de_vida_media": data['average_lifespan'],
		"mundo_natal":  update_url(data['homeworld']),
		"idioma":data['language'],
		"gente": update_url(data['people']),
		"peliculas": update_url(data['films']),
		"creado": data['created'],
		"editado": data['edited'],
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