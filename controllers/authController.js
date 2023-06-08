const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Review } = require('../db/sequelize');
const { Op, UniqueConstraintError, ValidationError } = require('sequelize');
const e = require('cors');
const private_key = require('../auth/private_key.js');

exports.signup = (req, res) => {
    // on récupère le password est on le hash
    bcrypt.hash(req.body.password, 10)
    .then((hash) => {
        // on crée un nouvel utilisateur
        return User.create({
            roles: req.body.roles,
            username: req.body.username,
            password: hash,
            mail: req.body.mail,
            picture: req.body.picture,
        })
        .then((userCreated) => {
            const token = signToken(userCreated.id)
            const message = `user ${userCreated.username} created`
            res.json({ message, user: userCreated, token })
        })
    })
    .catch (error => {
        if (error instanceof ValidationError || error instanceof UniqueConstraintError) {
            return res.status(400).json({ message: error.message })
        }
        const message = 'An error occured, please try again later'
        res.status(500).json({ message})
    })
}


exports.login = (req, res) => {
    if (!req.body.username || !req.body.password) {
        const message = "user id and password are required"
        return res.status(404).json({ message })
    }
    
    User.findOne({ where: { username: req.body.username } })
        .then((user) => {
            if (!user) {
                const message = 'User not found'
                return res.status(404).json({ message })
            }
            
            bcrypt.compare(req.body.password, user.password)
                .then(isPasswordValid => {
                    if (!isPasswordValid) {
                        const message = 'Password is not valid'
                        return res.status(404).json({ message })
                    }
                    
                    // json web token
                    const token = jwt.sign({
                        data: user.id
                    }, private_key, { expiresIn: '1h' });
                    const message = 'You are now logged in'
                    user.password = ''
                    const userRoles = user.roles
                    return res.json({ message, user, token })
                })
                .catch(err => console.log(err))
        })
        .catch((error) => {
            const message = 'User not found, please try again later'
            res.status(500).json({ message, data: error })
        })
}

exports.protect = (req, res, next) => {
    const authorizationHeader = req.headers.authorization

    console.log("protect",req.headers)

    if (!authorizationHeader) {
        const message = 'Token is necessary to authenticate'
        return res.status(401).json({ message })
    }
    try {
    const token = authorizationHeader.split(' ')[1];
    console.log("token",token)
    const decoded = jwt.verify(token, private_key);
    req.userId = decoded.data
    } catch (error) {
        const message = 'Token is not valid'
        return res.status(401).json({ message, data: error })
    }

    return next();
}


exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        User.findByPk(req.userId).then(user => {
            console.log(req.userId, user.username, user.roles, roles)
            if (!user || !roles.every(role => user.roles.includes(role))) {
                const message = 'Do not have the rights'
                return res.status(403).json({ message })
            }
            return next();
        })
        .catch(error => {
            const message = 'Not authorized'
            return res.status(500).json({ message, data: error })
        })
    }
}
exports.restrictToOwnUser = () => {
    return (req, res, next) => {
        User.findByPk(req.userId).then(user => {
            console.log(req.userId)
            return Review.findByPk(req.params.id).then(review => {
                if (review.id !== user.id) {
                    const message = "Vous n'êtes pas l'auteur de ce commentaire."
                    return res.status(403).json({ message });
                }
                return next();
            })
            
        }).catch(err => {
            return res.status(500).json({message: err.message, data: err})
        }) 
    }
}

