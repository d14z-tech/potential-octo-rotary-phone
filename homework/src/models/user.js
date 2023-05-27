import sequelize from "../config/databases/postgresql.js";
import { DataTypes, Model } from "sequelize";
import Bcrypt from "bcrypt";

class User extends Model {
  authenticate(unencrypted_password) {
    return Bcrypt.compareSync(unencrypted_password, this.password_digest);
  }
};

User.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password_digest: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.VIRTUAL,
    set(unencrypted_password) {
      this.setDataValue('password_digest', Bcrypt.hashSync(unencrypted_password, 12));
    }
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