const { json } = require("body-parser");
const UrlService = require("../services/url-service.js");

const urlService = new UrlService();

const getUrl = async (req, res) => {
  try {
    const requestUrl = "localhost:3000/" + req.params.code;
    const url = await urlService.getUrl(requestUrl);
    if (url != "Wrong URL") {
      const originalURL = url.longUrl;
      return res.redirect(originalURL);
    } else {
      res.status(404).json({
        data: "Wrong URL",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const createUrl = async (req, res) => {
  try {
    const url = await urlService.createURL(req.body.original_url);
    return res.status(200).json({
      data: url,
      success: true,
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getUrl,
  createUrl,
};
