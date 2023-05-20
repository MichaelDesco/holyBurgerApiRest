const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require('sequelize');
const RestaurantSequelize = require('../models/restaurant');
const BurgerSequelize = require('../models/burger');
const UserSequelize = require('../models/user');
const ReviewSequelize = require('../models/review');
const restaurants = require('../mock-restaurants');
const burgers = require('../mock-burgers');

const sequelize = new Sequelize('holy_burger_bdd', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  logging: false
});

const Restaurant = RestaurantSequelize(sequelize, DataTypes);
const Burger = BurgerSequelize(sequelize, DataTypes);
const User = UserSequelize(sequelize, DataTypes);
const Review = ReviewSequelize(sequelize, DataTypes);

// Define table relationships
User.hasMany(Review, {
  foreignKey: {
    allowNull: false
  }
});
Review.belongsTo(User);

Burger.hasMany(Review, {
  foreignKey: {
    allowNull: false
  }
});
Review.belongsTo(Burger);

Restaurant.hasMany(Burger, {
  foreignKey: {
    allowNull: true
  }
});
Burger.belongsTo(Restaurant);

// const initDb = () => {
//   return sequelize.sync({force: true}) 
//    .then(() => {
//     restaurants.forEach((element) => {
//       console.log("resto", element);
//       Restaurant.create({
//         name: element.name,
//         number: element.number,
//         street: element.street,
//         postCode: element.postCode,
//         city: element.city,
//         telephone: element.telephone,
//         picture: element.picture,
//         mail: element.mail
//       });
//     })

//     burgers.forEach((element) => {
//       console.log("burger", element);
//       Burger.create({
//         name: element.name,
//         price: element.price,
//         picture: element.picture,
//         garniture: element.garniture,
//         fromage: element.fromage,
//         legumes: element.legumes,
//         sauce: element.sauce,
//         RestaurantId: element.RestaurantId,
//         RestaurantName: element.RestaurantName
//       });
//     });

//     bcrypt.hash('mdp0', 10)
//       .then((hash) => {
//         User.create({
//           username: 'admin',
//           password: hash,
//           roles: ['admin', 'superadmin'],
//           mail: 'admin@gmail.com',
//           picture: '/images/licorn.png'
//         })
//       })
//       .catch(err => console.log(err))

//     bcrypt.hash('mdp1', 10)
//       .then((hash) => {
//         User.create({
//           username: 'user1',
//           password: hash,
//           roles: ['taster'],
//           mail: 'user1@mail.com',
//           picture: '/images/chat.png'
//         })
//       })
//       .catch(err => console.log(err))

//     bcrypt.hash('mdp2', 10)
//       .then((hash) => {
//         User.create({
//           username: 'user2',
//           password: hash,
//           roles: ['restorer'],
//           mail: 'user2@gmail.com',
//           picture: '/images/singe.png'
//         })
//       })
//       .catch (err => console.log(err))
//    })
//   .catch(error => console.log(error));
// }


sequelize.authenticate()
  .then(() => console.log('Successfully connected to the database.'))
  .catch(error => console.error(`Unable to connect to the database: ${error}`));


module.exports = {
    sequelize, User, Restaurant, Burger, Review
}