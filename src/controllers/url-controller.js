const { json } = require("body-parser");
const UrlService = require("../services/url-service.js");
const e = require("express");

const urlService = new UrlService();

const getUrl = async (req, res) => {
  try {
    // const requestUrl = "localhost:3000/" + req.params.code;
    const url = await urlService.getUrl(req.params.code);
    // console.log(url);
    if (url != "Wrong URL") {
      // const originalURL = url
      return res.redirect(url);
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
    // Original Url is teh url which is to be shortened
    // options field is the custom url(Custom name) which the user wants to use
    // options field is optional and its default value is None else it is the custom name
    const url = await urlService.createURL(req.body.original_url,req.body.options);
    return res.status(200).json({
      data: url,
      success: true,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,   
      err: error.message,
    });
  }
};

module.exports = {
  getUrl,
  createUrl,
};
