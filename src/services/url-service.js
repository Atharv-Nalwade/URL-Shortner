const shortid = require('shortid');
const isUrl = require('is-url');


const UrlRepository = require('../repository/url-repository');

class UrlService{
    constructor(){
        this.urlRepository = new UrlRepository();
    }

    async getUrl(data){
      try {
        const url = await this.urlRepository.getUrl(data);
        if( url!='Wrong URL' ){ 
          return url;
        }else { 
          return "Wrong URL Entered" ;
        }
      } catch( error ) {
        console.log(error);
      }
    }

  
    async createURL(data) {
        try {
          const urlExistsFlag = await this.urlRepository.urlExists(data);
          if (urlExistsFlag) {
            const ExistingUrl = await this.urlRepository.getFromLongURL(data);
            return ExistingUrl.shortURL;
          } else {
            if( isUrl(data) ){
              let shortenUrl = shortid.generate();
              let shorturl = 'localhost:3000/'+shortenUrl;
              const createPayload = { data, shorturl };
              const url = await this.urlRepository.create(createPayload);
              return url;
            }else{
              return {};
            }  
          }
        } catch (error) {
          console.log(error);
        }
      }
      
}

module.exports = UrlService ;