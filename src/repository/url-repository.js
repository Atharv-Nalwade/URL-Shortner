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
}

module.exports = UrlRepository ;