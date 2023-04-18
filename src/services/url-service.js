const shortid = require('shortid');

const UrlRepository = require('../repository/url-repository');

class UrlService{
    constructor(){
        this.urlRepository = new UrlRepository();
    }

    async createURL(data) {
        try {
          const urlExistsFlag = await this.urlRepository.urlExists(data);
          if (urlExistsFlag) {
            return urlExistsFlag;
          } else {
            const shorturl = shortid.generate();
            const createPayload = { data, shorturl };
            const url = await this.urlRepository.create(createPayload);
            return url;
          }
        } catch (error) {
          console.log(error);
        }
      }
      
}

module.exports = UrlService ;