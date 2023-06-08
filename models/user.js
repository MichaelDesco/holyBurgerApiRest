const { on } = require("nodemon")

const userRoles = ['goûteur','restaurateur', 'admin']

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    roles: {
      type: DataTypes.STRING,
      defaultValue: 'goûteur',
      set(roles) {
        this.setDataValue('roles', roles.join())
      },
      get() {
        return this.getDataValue('roles').split(',')
      },
      validate: {
        areRolesValid(roles){
          if(!roles){
            throw new Error('roles cannot be empty')
          }
          roles.split(',').forEach(role => {
            if(!userRoles.includes(role)){
              throw new Error(`role ${role} is not valid`)
            }
          })
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {msg : "username already exist"},
      validate: {
          notNull: {
              msg: "fill username field"
          }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mail:{
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true
    },
    picture: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: /^.*\.(jpg|JPG|jpeg|JPEG|png|PNG)$/,
          msg: "The picture must be a JPG or PNG file"
        }
      }
    },
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false,
    scopes: {
      withoutPassword: {
        attributes: { exclude: ['password'] },
      }
    },
    hooks: {
      afterCreate: (record) => {
          delete record.dataValues.password;
      },
      afterUpdate: (record) => {
          delete record.dataValues.password;
      },
    }
  });
};

