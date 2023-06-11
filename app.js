const express = require('express'); // Framework Express
const morgan = require('morgan'); // Logger
const serveFavicon = require('serve-favicon'); // Favicon
const cors = require ('cors'); // CORS
const path = require('path'); // Chemin
const sequelize = require('./db/sequelize') // Connexion à la base de données
const app = express(); // Initialisation de l'app

// Port du serveur
const port = 5001; 

// Initialisation de la base de données Sequelize
// sequelize.initDb();

// const configureCORS = (req, res, next) => {
//   //  je souhaite récupérer le rôle de l'utilisateur et le stocker dans une variable et ensuite autoriser selon les roles
//   const userRole = req.headers['restaurateur'] || ['taster'];
//   let allowedMethods = ['GET', 'POST', 'PUT'];

//   if (userRole.includes('admin')) {
//     allowedMethods.push('DELETE');
//   }

//   const corsOptions = {
//     origin: 'http://localhost:3000', // Adresse du serveur autorisé (ici React)
//     methods: allowedMethods.join(', '), // Méthodes autorisées
//     allowedHeaders: 'Content-Type, Authorization', // En-têtes autorisées
//     preflightContinue: false, // Bloque les requêtes OPTIONS
//     optionsSuccessStatus: 204, // Code renvoyé pour toutes les requêtes OPTIONS
//   };

//   res.header('Access-Control-Allow-Origin', corsOptions.origin);
//   res.header('Access-Control-Allow-Methods', corsOptions.methods);
//   res.header('Access-Control-Allow-Headers', corsOptions.allowedHeaders);

//   // Vérifier si la requête est une méthode OPTIONS, si oui, renvoyer une réponse vide
//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(corsOptions.optionsSuccessStatus);
//   }

//   next(); // Passe au middleware suivant
// };

// app.use(configureCORS);

app
  .use(morgan('dev')) // Middleware de journalisation des requêtes
  .use(serveFavicon(__dirname + '/favicon.ico')) // Middleware pour servir le favicon
  .use(express.json()) // Middleware pour parser les données JSON dans les requêtes
  .use(cors()) // Middleware pour gérer les requêtes CORS

// Importation des routes
const restaurantRouter = require('./routes/restaurantRoutes');
const burgerRouter = require('./routes/burgerRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const { OptimisticLockError } = require('sequelize');

// Configuration des routes
app.use('/api/restaurants', restaurantRouter)
app.use('/api/burgers', burgerRouter)
app.use('/api/users', userRouter)
app.use('/api/reviews', reviewRouter)

// Lancement du serveur
app.listen(port, () => {
  console.log(`L'app sur le port ${port}`);
});

