module.exports = (sequelize , DataTypes) => {
    return sequelize.define('Restaurant', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {msg : "This restaurant already exists, please choose another name"},
            validate: {
                notNull: {
                    msg: "Please fill in the name field"
                }
            }
        },
        number: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        street: {
            type: DataTypes.STRING,
            allowNull: false
        },
        postCode: {
            type: DataTypes.STRING,
            validate: {
                is: {
                    args: /^([0-9]{5})$/,
                    msg: "Please enter a valid 5-digit postal code"
                }
            }
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
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
        telephone: {
            type: DataTypes.STRING,
            validate: {
                is: {
                    args: /^([0-9]{10})$/,
                    msg: "Please enter a valid 8-digit phone number"
                }
            }
        },
        mail: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    msg: "Please enter a valid email address"
                }
            }
        },
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}