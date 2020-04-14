'use strict';
module.exports = (sequelize, DataTypes) => {
  const articles = sequelize.define('articles', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    author: DataTypes.STRING
  }, {});
  articles.associate = function(models) {
    // associations can be defined here
  };
  return articles;
};