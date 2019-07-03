const commonUtils = require("./commons")
const env = process.env.NODE_ENV || "development";
const config = require("../db/config/config.js")[env];

const WHITELISTALL = 1;
const BLACKLISTALL = 2;

const JP3 = {
  error: true,
  errorCode: "JP3",
  userMessage: "Error creating joke",
  message: "Error creating joke"
};

exports.WHITELISTALL = WHITELISTALL;
exports.BLACKLISTALL = BLACKLISTALL;
exports.JP3 = JP3;
