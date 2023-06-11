let burgers = require('../mock-burgers');
const { Burger, Restaurant, sequelize } = require('../db/sequelize');
const { Op, UniqueConstraintError, ValidationError, QueryTypes, where } = require('sequelize');
// =====================================================================================================

// GET
exports.findAllBurgers = (req, res) => {
    if(req.query.search){
        // notre recherche avec paramètres
        Burger.findAll(
            { where: { name: {[Op.like] : `%${req.query.search}%`} },
              include: Restaurant
            }
        )
        .then((elements)=>{
            if(!elements.length){
                return res.json({message: "No burger found with this name"})    
            }
            const msg = 'Burgers list has been retrieved from database.'
            res.json({message: msg, data: elements})
        })
        .catch((error) => {
            const msg = 'One error occured'
            res.status(500).json({message: msg})
        })
    } else {
        Burger.findAll({ 
            include: Restaurant,
        })
        .then((elements)=>{
            const msg = 'Burgers list has been retrieved from database.'
            res.json({message: msg, data: elements})
        })
        .catch((error) => {
            const msg = 'an error occured'
            res.status(500).json({message: msg})
        })
    }
}

exports.findBurgerByPk = (req, res) => {
    // Afficher le nom du restaurant qui correspond à l'id en paramètre
    Burger.findByPk(req.params.id, 
        { include: Restaurant }
    )
    .then((burger) => {
        if (burger === null) {
            const message = `Restaurant not found.`
            res.status(404).json({ message })
        } else {
            const msg = `Restaurant ${burger.name} has been retrieved from database.`
            res.json({ msg, data: burger })
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

exports.findRandomBurger = (req, res) => {
    Burger.findAll({
      order: [sequelize.literal('RAND()')],
      limit: 1,
    })
    .then((burgers) => {
        if (burgers.length === 0) {
            return res.json({ message: 'No burger found.' });
        }
        const burger = burgers[0];
        const message = 'Random burger has been retrieved from the database.';
        res.json({ message, data: burger });
    })
    .catch((error) => {
        const message = 'An error occurred.';
        res.status(500).json({ message });
    });
};


// POST
  exports.createBurger = (req, res,) => {
    let newBurger = req.body;

    // Synchronisation du modèle avec la base de données
    Burger.create({
        name: req.body.name,
        price: req.body.price,
        garniture: req.body.garniture,
        fromage: req.body.fromage,
        sauce: req.body.sauce,
        RestaurantId: req.body.restaurantId,
    })
    .then (()=> {
        console.log("ok")
        const message = `The burger ${newBurger.name} have been created`;
        res.json({ message: message, data: newBurger })
    })
    .catch((error) => {
        console.log(error)
        if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
            return res.status(400).json({ message: error.message, data: error }) 
        }
        res.status(500).json(error)
    })
}




// PUT
exports.updateBurger = (req, res) => {
    Burger.update(req.body, {
        where: {
            id: req.params.id
        }
    })

    .then((burger) => {
        // retourner la valeur d'une promesse permet de transmettre une erreur le cas échéant, rappel nécessaire
        return Burger.findByPk(req.params.id)
            .then(burger => {
                if (burger === null) {
                    const message = `Burger not found.`
                    res.status(404).json({ message })
                } else {
                    const message = `Burger ${burger.name} has been updated.`
                    res.json({ message, data: burger });
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
exports.deleteBurger = (req, res) => {
    Burger.findByPk(req.params.id)
    .then(burger => {

        if (burger === null) {
            const message = `Restaurant not found.`
            return res.status(404).json({ message })

        } else {
            burger.destroy({
                where: {id: req.params.id}
            })

            .then (()=> {
                const message = `The burger ${burger.name} have been deleted.`
                res.json({ message, data: burger })
            })

            .catch(error => {
                const message = `Impossible to delete burger.`
                res.status(500).json({ message, data: error })
            })
        }

    })

    .catch(error => {
        res.status(400).json({ message: error.message, data: error })   
    })      
}