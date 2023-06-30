module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Review', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5
            }
        },
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: 'userBurgerIndex'
        },
        BurgerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: 'userBurgerIndex'
        },
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false,
        indexes: [
            {
                unique: false,
                fields: ['UserId', 'BurgerId']
            }
        ]
    });

    return Review;
}

