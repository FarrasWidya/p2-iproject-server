'use strict';
const {
  Model
} = require('sequelize');
const { createHash } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING,
    avatar: DataTypes.STRING,
    gender: DataTypes.STRING,
    bio: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(user =>{
    user.password = createHash(user.password)
    user.avatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwTQqGv96_N5dZwGMyWrE5HfgSO1O3tSBeINP8KFG1gM0wPjSgfLR97fc3Z5UmheBkWV4&usqp=CAU"
  })
  return User;
};