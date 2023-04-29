const URL = require('../models/url');

class UrlRepository{

    async getUrl(data){
      try {
        const url = await URL.findOne({ shortURL : data });
         if(url !== null){
          await URL.findOneAndUpdate({shortURL:data}, {$inc:{clicks:1}});
          return url;
         }else{
           return "Wrong URL" ;
         }
      } catch (error) {
        console.log(error);
      }
    }

    async getFromLongURL(data){
      try {
        const url = await URL.findOne({ longUrl : data });
         if(url !== null){
          return url;
         }else{
           return "Wrong URL" ;
         }
      } catch (error) {
        console.log(error);
      }
    }

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