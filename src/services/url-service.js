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
      console.log(error);
    }
  }

  async createURL(data, options = "None") {
    try {
      const urlExistsFlag = await this.urlRepository.urlExists(data); // Check if URL already exists
      if (urlExistsFlag) {
        // If URL exists, return the short URL which has alreadt been made
        const ExistingUrl = await this.urlRepository.getFromLongURL(data);
        return ExistingUrl.shortURL;
      } else {
        // If URL does not exist, create a new short URL
        if (isUrl(data)) {
          let shorturl;
          if (options === "None") {
            let shortenUrl = shortid.generate();
            shorturl = "localhost:3000/" + shortenUrl;
          } else {
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
    }
  }
}

module.exports = UrlService;
