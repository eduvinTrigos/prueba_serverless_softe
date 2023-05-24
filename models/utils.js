const update_url = (data) => {
    if (Array.isArray(data)) {
      data = data.map((url) => {
        if (url === null) {
          return null;
        }
        return url.replace('https://swapi.py4e.com/api', 'http://localhost:4000');
      });
    } else {
      if (data === null) {
        return null;
      }
      data = data.replace('https://swapi.py4e.com/api', 'http://localhost:4000');
    }
    return data;
  };
  
  module.exports = { update_url };