const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Op, UniqueConstraintError, ValidationError } = require('sequelize')
const { User } = require('../db/sequelize')
const e = require('cors');
const private_key = require('../auth/private_key.js');

// GET
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

// PUT
exports.updateUser = (req, res) => {
    const { username, mail, password } = req.body;
    const userId = req.params.id;
  
    // Générer un nouveau hachage bcrypt pour le mot de passe
    bcrypt.hash(password, 10)
      .then((hashedPassword) => {
        // Mettre à jour l'utilisateur avec le nouveau mot de passe haché
        User.update({ username, mail, password: hashedPassword }, {
          where: {
            id: userId
          }
        })
          .then(([updatedRows]) => {
            if (updatedRows === 0) {
              const msg = "User not found.";
              return res.json({ message: msg });
            }
  
            // Générer un nouveau JSON Web Token (JWT)
            const token = jwt.sign({ userId: userId }, 'mon_petit_secret');
  
            const msg = "User updated.";
            res.json({ message: msg, data: updatedRows, token });
          })
          .catch((error) => {
            const msg = "Error updating user.";
            res.status(500).json({ message: msg });
          });
      })
      .catch((error) => {
        const msg = "Error hashing password.";
        res.status(500).json({ message: msg });
      });
  };
  
// DELETE
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
