let reviews = require('../mock-reviews');
const { Op, UniqueConstraintError, ValidationError } = require('sequelize');
const { Review, User, Burger } = require('../db/sequelize')

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

exports.createReview = (req, res) => {
    Review.create({
        content: req.body.content,
        rating: req.body.rating,
        UserId: req.body.UserId,
        BurgerId: req.body.burgerId
    }) 
        .then(result => {
            const message = "review created"
            res.json({message, data: result})
        }).catch(error => {
            if(error instanceof UniqueConstraintError || error instanceof ValidationError){
                return res.status(400).json({message: error.message, data: error})
            } 
            const message = "review not created"
            res.status(500).json({message, data: error})
        })
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