const shortid = require('shortid');

const UrlRepository = require('../repository/url-repository');

class UrlService{
    constructor(){
        this.urlRepository = new UrlRepository();
    }

    async createURL(data){
        try {
            const shorturl = shortid.generate();
            const createPayload = { data , shorturl};
            const url = this.urlRepository.create(createPayload);
            return url;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = UrlService ;