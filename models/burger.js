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
        cooker: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
              len: {
                args: [2, 50],
                msg: "Le nom du cuisinier doit comporter entre 2 et 50 caractères"
              }
            }
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
              isInt: {
                msg: "price must be an integer"
              },
              min: {
                args: [0],
                msg: "price must be positive"
              }
            }
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
        garniture: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notNull: {
                msg: "Veuillez remplir le champ de la garniture"
              }
            }
        },
        garniture2: {
            type: DataTypes.STRING,
            allowNull: true
        },
        fromage: {
            type: DataTypes.STRING,
            allowNull: true
        },
        legumes: {
            type: DataTypes.JSON,
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
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        RestaurantId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'Restaurants',
              key: 'id',
              onDelete: 'CASCADE'
            }
        },
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}
