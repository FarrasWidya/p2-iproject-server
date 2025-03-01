'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Content extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Content.hasMany(models.Comment)
      Content.belongsTo(models.Tag)
      Content.belongsTo(models.User)
    }
  }
  Content.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    upvote: DataTypes.INTEGER,
    downvote: DataTypes.INTEGER,
    UserId:DataTypes.INTEGER,
    TagId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Content',
  });
  Content.beforeCreate(content =>{
    content.upvote = 0
    content.downvote = 0
  })
  return Content;
};