const constants = require("../../utils/constants.js");
const commonUtils = require("../../utils/commons.js");

const whiteListRules = {
  blackList: [],
  default: constants.WHITELISTALL
};

module.exports = function(sequelize, DataTypes) {
  var JokeCategory = sequelize.define("JokeCategory", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    logoUrl: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    classMethods: {
      getWhitelistedValues: function(JokeCategory) {
        return commonUtils.getWhitelistedOp(JokeCategory,whiteListRules);
      }
    }
  });
  return JokeCategory;
}
