const constants = require("../../utils/constants.js");
const commonUtils = require("../../utils/commons.js");

const whiteListRules = {
  blackList: [],
  default: constants.WHITELISTALL
};

module.exports = function(sequelize, DataTypes) {
  var Joke = sequelize.define("Joke", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    jokesCategory: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    }
  }, {
    classMethods: {
      getWhitelistedValues: function(Joke) {
        return commonUtils.getWhitelistedOp(Joke,whiteListRules);
      }
    }
  });
  return Joke;
}
