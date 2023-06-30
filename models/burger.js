// module qui permet de faire des tests afin de vérifier que le code fonctionne correctement.
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
            defaultValue: "https://www.sbburger.fr/wp-content/uploads/2021/07/Resized_5A2A3065.jpg",
            allowNull: true,
        },
        garniture: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notNull: {
                msg: "Please fill in the field for the garnish"
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
                msg: "Please fill in the field for the sauce"
              }
            }
        },
        RestaurantId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false,
    })
}

