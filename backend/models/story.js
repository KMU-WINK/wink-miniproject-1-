const { Model, DataTypes } = require('sequelize');

class Story extends Model {
  static init(sequelize) {
    return super.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
          },
          nickname: {
            type: DataTypes.STRING,
            allowNull: false,  // NOT NULL 설정
          },
          title: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          content: {
            type: DataTypes.TEXT,
            allowNull: false,
          },
          createdAt: DataTypes.DATE,
          updatedAt: DataTypes.DATE,
        }, {
      sequelize,
      modelName: 'Story',
      tableName: 'stories',
      timestamps: true,
    }, {
        timestamps: true, // 기본값이므로 명시하지 않아도 됩니다.
      });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  }
}

module.exports = Story;

