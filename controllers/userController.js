const { ValidationError, UniqueConstraintError } = require('sequelize')
const { User } = require('../db/sequelize')
const { Op } = require('sequelize')
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')

exports.findAllUsers = (req, res) => {
    User.scope('withoutPassword').findAll()
    .then((elements)=>{
        const message = 'Users list has been retrieved from database'
        res.json({message, data: elements})
    })
    .catch((error) => {
        const message = 'error occured'
        res.status(500).json({message})
    })
}

exports.findOneUser = (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    }).then((user) => {
        if(user === null){
            const msg = "User not found."
            res.json({message: msg})
        } else {
            const msg = "User found."
            res.json({message: msg, data: user})
        }
    }).catch((error) => {
        const msg = "Impossible to find user."
        res.status(500).json({message: msg})
    })
}


exports.findRoles = (req, res) => {
    User.findAll({
        where: {
            roles: req.params.roles
        }
    }).then((user) => {
        if(user === null){
            const msg = "User not found."
            res.json({message: msg})
        } else {
            const msg = "User found."
            res.json({message: msg, data: user})
        }
    }).catch((error) => {
        const msg = "Impossible to find user."
        res.status(500).json({message: msg})
    })
}

exports.createUser = (req, res) => {
    User.create({
        roles: req.body.roles,
        username: req.body.username,
        password: req.body.password,
        mail: req.body.mail,
        picture: req.body.picture,
    }).then(result => {
        const message = "User created"
        res.json({message, data: result})
    }).catch(error => {
        if(error instanceof UniqueConstraintError || error instanceof ValidationError){
            return res.status(400).json({message: error.message, data: error})
        } 
        const message = "User not created"
        res.status(500).json({message, data: error})
    })
}

exports.updateUser = (req, res) => {
    User.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then((user) => {
        if(user === null){
            const msg = "User not found."
            res.json({message: msg})
        } else {
            const msg = "User updated."
            res.json({message: msg, data: user})
        }
    }).catch((error) => {
        if(error instanceof UniqueConstraintError || error instanceof ValidationError){
            return res.status(400).json({message: error.message, data: error})
        } 
        const msg = "Impossible to update user."
        res.status(500).json({message: msg})
    })
}

exports.deleteUser = (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then((user) => {
        if(user === null){
            const message = "User not found."
            return res.status(404).json({message})
        } else {
            user.destroy({
                where: {id: req.params.id}
            })
            .then (() => {
                const message = `User ${user.username} have been deleted.`
                res.json({message, data: user})
            })
            .catch((error) => {
                const message = "Impossible to delete user."
                res.status(500).json({message, data: error})
            })
        }
    })
    .catch((error) => {
        res.status(400).json({message: error.message, data: error})
    })
}
