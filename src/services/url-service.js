const shortid = require("shortid");
const isUrl = require("is-url");

const UrlRepository = require("../repository/url-repository");

class UrlService {
  constructor() {
    this.urlRepository = new UrlRepository();
  }

  async getUrl(data) {
    try {
      const url = await this.urlRepository.getUrl(data);
      if (url != "Wrong URL") {
        return url;
      } else {
        return "Wrong URL Entered";
      }
    } catch (error) {
      console.log("Inside getUrl catch");
      console.log(error);
    }
  }

  async getStatistics(data) {
    try {
      if(await this.getUrl(data) !== "Wrong URL Entered"){
      const stats = await this.urlRepository.getStatistics(data);
      return stats;}
      else{
        return "Wrong URL Entered";
      }
    } catch (error) {
      console.log("Inside getStatistics catch");
      console.log(error);
    }
  }

  async createURL(data, options = "None") {
    try {
      let customNameExistsFlag = false;
      const urlExistsFlag = await this.urlRepository.urlExists(data); // Check if URL already exists

      if (options !== "None") {
        customNameExistsFlag = await this.urlRepository.customNameExists(
          options
        ); // Check if custom name already exists
      }

      if (urlExistsFlag) {
        // If URL exists, return the short URL which has already been made
        const ExistingUrl = await this.urlRepository.getFromLongURL(data);
        let sameCustomNameFlag = false;

        if (options !== "None" && ExistingUrl.options !== options) {
          sameCustomNameFlag = true;
          await this.urlRepository.addCustomName(ExistingUrl.longUrl, options);
        }

        if (!sameCustomNameFlag) {
          console.log("Same custom name flag is", sameCustomNameFlag);
          return ExistingUrl.shortURL;
        } else {
          let shorturl = "localhost:3000/" + options;
          return shorturl;
        }

      } else {

        if (customNameExistsFlag) {
          throw new Error("Custom name already exists");
        }

        // If URL does not exist, create a new short URL
        if (isUrl(data)) {
          let shorturl;
          
          if (options === "None") {
            let shortenUrl = shortid.generate();
            shorturl = "localhost:3000/" + shortenUrl;
          } else {
            // Custom name for the short URL
            shorturl = "localhost:3000/" + options;
          }
          
          const createPayload = { data, shorturl, options };
          console.log(createPayload);
          const url = await this.urlRepository.create(createPayload);
          return url;

        } else {
          return {};
        }

      }
    } catch (error) {
      console.log(error);
      throw error; // Re-throw the error to propagate it to the controller
    }
  }
}

module.exports = UrlService;
