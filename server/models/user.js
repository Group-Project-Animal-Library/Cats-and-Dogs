'use strict';
const {generatePW} = require('../helpers/bcrypt')
const {
  Model
} = require('sequelize');
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
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: 'true',
          msg: 'Only E-Mail is required'
        },
        notEmpty: {
          args: 'true',
          msg: 'E-Mail is required'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: 'true',
          msg: 'Password is required'
        },
        len: {
          args: [8],
          msg: 'Password length minimum is 8 chars'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user, options) => {
    user.password = generatePW(user.password);
  })
  return User;
};