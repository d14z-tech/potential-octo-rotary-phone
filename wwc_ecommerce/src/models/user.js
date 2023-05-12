import sequelize from "../config/databases/postgresql.js";
import { DataTypes, Model } from "sequelize";

class User extends Model {};

User.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
{
  sequelize,
  modelName: 'User',
  tableName: 'users',
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default User;