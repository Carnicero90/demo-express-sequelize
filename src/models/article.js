'use strict';
const { UUIDV4 } = require('sequelize');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    toJSON() {
      return { ...this.get(), id: undefined }
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate({ Author }) {
      // define association here
      this.belongsTo(Author, { foreignKey: 'author'});

    }
  }
  Article.init({
    uuid:
    {
      type: DataTypes.UUID,
      defaultValue: UUIDV4
    },
    title:
    {
      type: DataTypes.STRING,
      allowNull: false
    },

    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Article',
    tableName: 'articles',
  });
  return Article;
};