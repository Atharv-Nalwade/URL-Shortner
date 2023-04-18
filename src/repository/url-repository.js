const URL = require('../models/url');

class UrlRepository{

    async create(data){
        try {
            data = { longUrl : data.data, shortURL: data.shorturl} ;
            const url = await URL.create(data);
            return url;
        } catch (error) {
            console.log(error);
        }
    }

    async urlExists(UrlData) {
        try {
          let urlExistsFlag = await URL.findOne({ longUrl: UrlData });
          if (urlExistsFlag === null) {
            return false; // URL does not exist
          } else {
            return true; // URL exists
          }
        } catch (error) {
          console.log(error);
        }
      }
}

module.exports = UrlRepository ;