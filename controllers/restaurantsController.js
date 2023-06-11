let restaurants = require('../mock-restaurants');
const { Restaurant, Burger, sequelize } = require('../db/sequelize');
const { Op, UniqueConstraintError, ValidationError, or } = require('sequelize');

// GET
exports.findAllRestaurants = (req, res) => {
    if(req.query.search){
        // notre recherche avec paramètres
        Restaurant.findAll({ 
            where: { 
                name: {[Op.like] : `%${req.query.search}%`,
            },
            include: Burger,
            order: ['name', 'ASC'] 
        },
    })
    .then((elements)=>{
        if(!elements.length){
            return res.json({message: "No restaurant found with this name"})    
        }
        const message = 'Restaurants list has been retrieved from database.'
        res.json({message, data: elements})
    })
    .catch((error) => {
        const message = 'One error occured'
        res.status(500).json({message})
    })
    } else {
        Restaurant.findAll({ 
            include: Burger,
        })
        .then((elements)=>{
            const message = 'Restaurants list has been retrieved from database.'
            res.json({message, data: elements})
        })
        .catch((error) => {
            const message = 'an error occured'
            res.status(500).json({message})
        })
    }
}

exports.findRestaurantByPk = (req, res) => {
    // Afficher le nom du restaurant qui correspond à l'id en paramètre
    Restaurant.findByPk(req.params.id, 
        { include: Burger }
    )
    .then((restaurant) => {
        if (restaurant === null) {
            const message = `Restaurant not found.`
            res.status(404).json({ message })
        } else {
            const msg = `Restaurant ${restaurant.name} has been retrieved from database.`
            res.json({ msg, data: restaurant })
        }
    })
    .catch(error => {
        if (error instanceof ValidationError || error instanceof UniqueConstraintError) {
            return res.status(400).json({ message: error.message, data: error })
        }
        const message = `Impossible to retrieve restaurant.`
        res.status(500).json({ message, data: error })
    })
}

exports.findBurgersByRestaurantId = (req, res) => {
    // Vérifier que l'ID du restaurant existe
    Restaurant.findByPk(req.params.id)
    .then((restaurant) => {
        if (restaurant === null) {
            const message = `Restaurant not found.`
            res.status(404).json({ message })
        } else {
            // Afficher les burgers qui correspondent à l'id du restaurant en paramètre
            restaurant.getBurgers(req.params.id, 
                { include: Restaurant }
            )
            .then((burgers) => {
                const msg = `Burgers from restaurant ${restaurant.name} have been retrieved from database.`
                res.json({ msg, data: burgers })
            })
            .catch(error => {
                const message = `Impossible to retrieve burgers.`
                res.status(500).json({ message, data: error })
            })
        }
    })
    .catch(error => {
        const message = `Impossible to retrieve restaurant.`
        res.status(500).json({ message, data: error })
    })
}

exports.findRestaurantsByUser = (req, res) => {
    // Afficher les restaurants qui correspondent à l'id de l'utilisateur en paramètre
    const userId = req.params.id

    Restaurant.findAll({ 
        where: { 
            UserId: userId
        } 
    })
    .then((elements)=>{
        if(!elements.length){
            return res.json({message: "No restaurant found with this name", data: {}})    
        }
        const message = 'Restaurants list has been retrieved from database.'
        res.status(200).json({message, data: elements})
    })
    .catch((error) => {
        const message = 'One error occured'
        res.status(500).json({message})
    })
}

exports.findRandomRestaurant = (req, res) => {
    Restaurant.findAll({
      order: [sequelize.literal('RAND()')],
      limit: 1,
    })
    .then((restaurants) => {
        if (restaurants.length === 0) {
            return res.json({ message: 'No restaurant found.' });
        }
        const restaurant = restaurants[0];
        const message = 'Random restaurant has been retrieved from the database.';
        res.json({ message, data: restaurant });
    })
    .catch((error) => {
        const message = 'An error occurred.';
        res.status(500).json({ message });
    });
};      

// // POST
exports.createRestaurant = (req, res,) => {
    let newRestaurant = req.body;
    // Synchronisation du modèle avec la base de données
    Restaurant.create({
        name: req.body.name,
        number: req.body.number,
        street: req.body.street, 
        postCode: req.body.postCode,
        city: req.body.city,
        picture: req.body.picture,
        telephone: req.body.telephone,
        mail: req.body.mail,
        UserId: req.body.UserId
    })
    .then (()=> {
        const message = `The restaurant ${newRestaurant.name} have been created`;
        res.json({ message, data: newRestaurant })
    })
    .catch((error) => {
        if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
            return res.status(400).json({ message: error.message, data: error }) 
        }
        res.status(500).json(error)
    })
}

// PUT
exports.updateRestaurant = (req, res) => {
    Restaurant.update(req.body, {
        where: {
            id: req.params.id
        }
    })

    .then((restaurant) => {
        // retourner la valeur d'une promesse permet de transmettre une erreur le cas échéant, rappel nécessaire
        return Restaurant.findByPk(req.params.id)
            .then(restaurant => {
                if (restaurant === null) {
                    const message = `Restaurant not found.`
                    res.status(404).json({ message })
                } else {
                    const message = `Restaurant ${restaurant.name} has been updated.`
                    res.json({ message, data: restaurant });
                }
            })
    })
    
    .catch((error) => {
        if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
            return res.status(400).json({ message: error.message, data: error })
        }

        const message = `Impossible to update restaurant.`
        res.status(500).json({ message, data: error })
    })
}

// DELETE
// exports.deleteRestaurant = (req, res) => {
//     Restaurant.findByPk(req.params.id)
//     .then(restaurant => {

//         if (restaurant === null) {
//             const message = `Restaurant not found.`
//             return res.status(404).json({ message })

//         } else {
//             restaurant.destroy({
//                 where: {id: req.params.id}
//             })

//             .then (()=> {
//                 const message = `The restaurant ${restaurant.name} have been deleted.`
//                 res.json({ message, data: restaurant })
//             })

//             .catch(error => {
//                 const message = `Impossible to delete restaurant.`
//                 res.status(500).json({ message, data: error })
//             })
//         }

//     })

//     .catch(error => {
//         res.status(400).json({ message: error.message, data: error })   
//     })      
// }


