const URL = require("../models/url");
const redisClient = require("../configs/redisconfig");

const { promisify } = require("util");

// Promisify the redisClient.get() method
const redisGetAsync = promisify(redisClient.get).bind(redisClient);

class UrlRepository {


   /**
   * Retrieve the long URL associated with the given data.
   * @param {string} data - The data to retrieve the URL for.
   * @returns {Promise<string>} The long URL.
   */
  async getUrl(data) {
    try {
      const keyExists = await new Promise((resolve, reject) => {
        redisClient.exists(data, (err, result) => {
          if (err) reject(err);
          resolve(result === 1);
        });
      });

      if (keyExists) {
        const value = await new Promise((resolve, reject) => {
          redisClient.get(data, (err, value) => {
            if (err) reject(err);
            resolve(value);
          });
        });

        return JSON.parse(value);
      } else {
        let url = await URL.findOne({ options: { $in: data } });
        if (url == null) {
          url = await URL.findOne({ shortURL: `localhost:3000/${data}` });
        }

        if (url !== null) {
          await URL.findOneAndUpdate(
            { shortURL: data },
            { $inc: { clicks: 1 } }
          );
          await redisClient.set(data, JSON.stringify(url.longUrl));
          console.log("Cache Miss, Added to Redis:", url.longUrl);
          return url.longUrl;
        } else {
          console.log("Wrong URL");
          return "Wrong URL";
        }
      }
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  }


  /**
   * Retrieve the URL document associated with the given long URL.
   * @param {string} data - The long URL.
   * @returns {Promise<object|string>} The URL document or "Wrong URL" if not found.
   */
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


    /**
   * Create a new URL document.
   * @param {object} data - The URL data.
   * @returns {Promise<object>} The created URL document.
   */
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
 
  /**
   * Check if a URL already exists.
   * @param {string} UrlData - The URL to check.
   * @returns {Promise<boolean>} A flag indicating if the URL exists.
   */
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

  /**
   * Check if a custom name already exists.
   * @param {string} customName - The custom name to check.
   * @returns {Promise<boolean>} A flag indicating if the custom name exists.
   */
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


    /**
   * Add a custom name to the URL document.
   * @param {string} longUrl - The long URL.
   * @param {string} customName - The custom name to add.
   */
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

