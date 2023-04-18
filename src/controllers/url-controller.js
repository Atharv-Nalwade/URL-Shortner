const { json } = require('body-parser');
const UrlService = require('../services/url-service.js');

const urlService = new UrlService();

const getUrl = async (req, res) => {
    try {
      console.log(req.body.original_url);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
};

const createUrl = async (req, res) => {
    try {
      const url = await urlService.createURL(req.body.original_url);
      return res.status(200).json({
        data:url,
        success:true,
        err:{}
      });
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
};



module.exports = {
    getUrl,
    createUrl
}