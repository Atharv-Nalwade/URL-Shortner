const URL = require("../models/url");
const redisClient = require("../configs/redisconfig");



class UrlRepository {
  // async getUrl(data) {
  //   try {
  //     console.log("Dats is",data);
  //     const answer = await redisClient.get(data);
  //     console.log(answer);
  //     if(answer){
  //       console.log("hit")
  //       console.log(answer)
  //       return JSON.parse(answer);
  //     }else{
  //       let url = await URL.findOne({ options: { $in: data } }); //check if the data(cutsom name) is in options field
  //       if (url == null) {
  //         url = await URL.findOne({ shortURL: `localhost:3000/${data}` }); //check if the data is in shortURL field
  //       }
  //       if (url !== null) {
  //         await URL.findOneAndUpdate({ shortURL: data }, { $inc: { clicks: 1 } });
  //       } else {
  //         return "Wrong URL";
  //       }
  //       console.log(url);
  //       await redisClient.set(data, JSON.stringify(url.longUrl));
  //       return url.longUrl ;
  //     }

     
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
   
  async getUrl(data) {
    try {
      // const keyExists = await redisClient.exists(data);
      // console.log("Key Exists:", keyExists )
  
      // if (keyExists) {
      //   const value = await redisClient.get(data);
      //   console.log("Cache Hit:", value);
      //   return JSON.parse(value);
      // } else {
        let url = await URL.findOne({ options: { $in: data } });
        if (url == null) {
          url = await URL.findOne({ shortURL: `localhost:3000/${data}` });
        }
  
        if (url !== null) {
          await URL.findOneAndUpdate({ shortURL: data }, { $inc: { clicks: 1 } });
          await redisClient.set(data, JSON.stringify(url.longUrl));
          console.log("Cache Miss, Added to Redis:", url.longUrl);
          return url.longUrl;
        } else {
          console.log("Wrong URL");
          return "Wrong URL";
        }
      // }
    } catch (error) {
      console.log("Error:", error);
      throw error;
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



  // async getUrl(data) {
  //   try {
  //     const answer = await new Promise((resolve, reject) => {
  //       redisClient.get(data, (err, reply) => {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           resolve(reply);
  //         }
  //       });
  //     });
  
  //     if (answer) {
  //       console.log("Cache Hit");
  //       return JSON.parse(answer);
  //     } else {
  //       let url = await URL.findOne({ options: { $in: data } });
  //       if (url == null) {
  //         url = await URL.findOne({ shortURL: `localhost:3000/${data}` });
  //       }
  //       if (url !== null) {
  //         await URL.findOneAndUpdate({ shortURL: data }, { $inc: { clicks: 1 } });
  //       } else {
  //         return "Wrong URL";
  //       }
  //       await new Promise((resolve, reject) => {
  //         redisClient.set(data, JSON.stringify(url), (err, reply) => {
  //           if (err) {
  //             reject(err);
  //           } else {
  //             resolve(reply);
  //           }
  //         });
  //       });
  //       return url;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
