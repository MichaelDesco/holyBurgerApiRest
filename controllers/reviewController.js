let reviews = require('../mock-reviews');
const { Op, UniqueConstraintError, ValidationError } = require('sequelize');
const { Review, User, Burger } = require('../db/sequelize');
const burger = require('../models/burger');

exports.findAllReviews = (req, res) => {
    Review.findAll({
        include: [User.scope('withoutPassword'), Burger]
    }) 
        .then(results => {
            const message = "Reviews list has been retrieved from database"
            res.json({message, data: results})
        }).catch(error => {
            const message = "Reviews list can't be retrieved from database"
            res.status(500).json({message, data: error})
        })
}

exports.findReviewByPk = (req, res) => {
    // Afficher le nom du user qui correspond à l'id en paramètre
    Review.findByPk(req.params.id, 
        { include: User, Burger }
    )
    .then((user) => {
        if (user === null) {
            const message = `User not found.`
            res.status(404).json({ message })
        } else {
            const msg = `User ${user.name} has been retrieved from database.`
            res.json({ msg, data: user })
        }
    })
    .then((burger) => {
        if (burger === null) {
            const message = `Burger not found.`
            res.status(404).json({ message })
        } else {
            const msg = `Burger ${burger.name} has been retrieved from database.`
            res.json({ msg, data: burger })
        }
    })
    .catch(error => {
        if (error instanceof ValidationError || error instanceof UniqueConstraintError) {
            return res.status(400).json({ message: error.message, data: error })
        }
        const message = `Impossible to retrieve user.`
        res.status(500).json({ message, data: error })
    })
}

exports.createReview = (req, res) => {
    const { userId, burgerId } = req.body;

    // Vérifier si l'utilisateur a déjà laissé un avis sur ce burger
    Review.findOne({
        where: {
            UserId: userId,
            BurgerId: burgerId
        }
    })
    .then(existingReview => {
        if (existingReview) {
            // Si un avis existant est trouvé, renvoyer une réponse indiquant qu'un avis a déjà été laissé
            return res.status(400).json({ message: "Vous avez déjà laissé un avis sur ce burger." });
        }

        // Si aucun avis existant n'est trouvé, créer une nouvelle revue
        Review.create({
            content: req.body.content,
            rating: req.body.rating,
            UserId: userId,
            BurgerId: burgerId
        })
        .then(result => {
            const message = "Avis créé avec succès.";
            res.json({ message, data: result });
        })
        .catch(error => {
            const message = "Erreur lors de la création de l'avis.";
            res.status(500).json({ message, data: error });
        });
    })
    .catch(error => {
        const message = "Erreur lors de la recherche de l'avis existant.";
        res.status(500).json({ message, data: error });
    });
}



// exports.updateReview = (req, res) => {
//     // Modifier le review en base de données qui correspond à l'id spécifé dans les params
//     Review.update(req.body, {
//         where: {
//             id: req.params.id
//         }
//     }).then((review) => {
//         if(review === null){
//             const msg = "Review not found."
//             res.json({message: msg})
//         } else {
//             const msg = "Review updated."
//             res.json({message: msg, data: review})
//         }
//     }).catch((error) => {
//         if(error instanceof UniqueConstraintError || error instanceof ValidationError){
//             return res.status(400).json({message: error.message, data: error})
//         } 
//         const msg = "Impossible to update review."
//         res.status(500).json({message: msg})
//     })
// }

// // ==========
// // DELETE
// exports.deleteReview = (req, res) => {
//     Review.findByPk(req.params.id)
//     .then(review => {

//         if (review === null) {
//             const message = `Review not found.`
//             return res.status(404).json({ message })

//         } else {
//             review.destroy({
//                 where: {id: req.params.id}
//             })

//             .then (()=> {
//                 const message = `The review ${review.UserId} have been deleted.`
//                 res.json({ message, data: review })
//             })

//             .catch(error => {
//                 const message = `Impossible to delete review.`
//                 res.status(500).json({ message, data: error })
//             })
//         }

//     })

//     .catch(error => {
//         res.status(400).json({ message: error.message, data: error })   
//     })      
// }
// =====================================================================================================