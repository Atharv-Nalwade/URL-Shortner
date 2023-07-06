const URL = require("../models/url");

class UrlRepository {
  async getUrl(data) {
    try {
      const url = await URL.findOne({ shortURL: data });
      if (url !== null) {
        await URL.findOneAndUpdate({ shortURL: data }, { $inc: { clicks: 1 } });
        return url;
      } else {
        return "Wrong URL";
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getFromLongURL(data) {
    try {
      const url = await URL.findOne({ longUrl: data });
      if (url !== null) {
        return url;
      } else {
        return "Wrong URL";
      }
    } catch (error) {
      console.log(error);
    }
  }

  async create(data) {
    try {
      data = {
        longUrl: data.data,
        shortURL: data.shorturl,
        options: data.options,
      };
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

  async customNameExists(customName) {
    try {
      let customNameExistsFlag = await URL.findOne({ options: customName });
      if (customNameExistsFlag === null) {
        return false; // Custom name does not exist
      } else {
        return true; // Custom name exists
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addCustomName(longUrl, customName) {
    try {
      console.log(longUrl, customName);
      let insertedCustomName = await URL.findOneAndUpdate(
        { longUrl: longUrl },
        { $push: { options: { $each: [customName] } } }, // Push the customName as an array element
        { new: true } // Return the updated document
      );
      console.log(insertedCustomName);
    } catch (error) {
      console.log(error);
    }
  }
  
}

module.exports = UrlRepository;
