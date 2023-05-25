const { update_url } = require('./utils');

const people = (data) => {
    return {
      "nombre": data['name'],
      "altura": data['height'],
      "masa": data['mass'],
      "color_cabello": data['hair_color'],
      "color_de_la_piel": data['skin_color'],
      "color_ojos": data['eye_color'],
      "año_nacimiento": data['birth_year'],
      "genero": data['gender'],
      "mundo_natal": update_url(data['homeworld']),
      "peliculas": update_url(data['films']),
      "especies": update_url(data['species']),
      "vehiculos":  update_url(data['vehicles']),
      "naves_estelares": update_url(data['starships']),
      "creado": data['created'],
      "editado": data['edited'],
      "url": update_url(data['url'])
    };
};

module.exports = {
    Get: people,
    Get_total: (data) => {
      return {
          "total": data['count'],
          "siguiente": update_url(data['next']),
          "anterior": update_url(data['previous']),
          "resultados": data['results'].map((item) => {
              return people(item);
          }),
      };
  },
};