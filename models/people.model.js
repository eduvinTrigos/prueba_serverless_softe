const { update_url } = require('./utils');

const people = (data) => {
    return {
      "name": data['name'],
      "height": data['height'],
      "mass": data['mass'],
      "hair_color": data['hair_color'],
      "skin_color": data['skin_color'],
      "eye_color": data['eye_color'],
      "birth_year": data['birth_year'],
      "gender": data['gender'],
      "homeworld": update_url(data['homeworld']),
      "films": update_url(data['films']),
      "species": update_url(data['species']),
      "vehicles":  update_url(data['vehicles']),
      "starships": update_url(data['starships']),
      "created": data['vehicles'],
      "edited": data['url'],
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