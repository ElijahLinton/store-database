const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    // define columns
    id:{
      type: DataTypes.INTEGER,
      allowNull:false,
      primaryKey: true,
      autoIncrement:true,
    },
    columns:{
      type: DataTypes.INTEGER,
      allowNull: false,


    },
    product_id:{
      type: DataTypes.INTEGER,
      References:{
      model:'product_id',
      key:'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
