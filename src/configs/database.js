const mongoose = require("mongoose");

const connect = async () => {
  await mongoose.connect("mongodb://localhost/URL_Shortner");
};

module.exports = connect;
