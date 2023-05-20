const { on } = require("nodemon")

module.exports = (sequelize , DataTypes) => {
    return sequelize.define('Burger', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {msg : "this burger already exist, please choose another burger name"},
            validate: {
                notNull: {
                    msg: "fill name field"
                }
            }
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
              isInt: {
                msg: "price must be an integer",
              },
              min: {
                args: [0],
                msg: "price must be positive"
              }
            }
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        garniture: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notNull: {
                msg: "Veuillez remplir le champ de la garniture"
              }
            }
        },
        fromage: {
            type: DataTypes.STRING,
            allowNull: true
        },
        sauce: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notNull: {
                msg: "Veuillez remplir le champ de la sauce"
              }
            }
        },
        RestaurantId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}

