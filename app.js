const express = require('express'); // Framework Express
const morgan = require('morgan'); // Logger
const serveFavicon = require('serve-favicon'); // Favicon
const helmet = require('helmet'); // Sécurité
const sequelize = require('./db/sequelize') // Connexion à la base de données
const app = express(); // Initialisation de l'app
const port = 5001; // Port du serveur
const cors = require ('cors'); // CORS
const path = require('path'); // Chemin

// Initialisation de la base de données Sequelize
// sequelize.initDb();

const corsOptions = { // la constante corsOptions défini les options de configuration de CORS.
  origin: 'http://localhost:3000', // Adresse du serveur autorisé (ici React)
  methods: 'GET, POST', // Méthodes autorisées
  allowedHeaders: 'Content-Type, Authorization', // En-têtes autorisées
  preflightContinue: false, // Bloque les requêtes OPTIONS
  optionsSuccessStatus: 204 // Code renvoyé pour toutes les requêtes OPTIONS
};


app
  .use(morgan('dev')) // Middleware de journalisation des requêtes
  .use(serveFavicon(__dirname + '/favicon.ico')) // Middleware pour servir le favicon
  .use(express.json()) // Middleware pour parser les données JSON dans les requêtes
  .use(cors(corsOptions)) // Middleware pour gérer les requêtes CORS
  .use(helmet()); // Middleware pour la sécurité Helmet

  app.use( // Middleware pour configurer le filtre de sécurité CSP
    helmet.contentSecurityPolicy({  // Configuration du filtre de sécurité CSP
      directives: { // Directives du filtre
        defaultSrc: ["'self'"], // Sources autorisées pour les ressources chargées par défaut
      },
    })
  );
  
  app.use(helmet.hidePoweredBy()); // Middleware pour masquer l'en-tête X-Powered-By
  
  app.use(helmet.xssFilter()); // Middleware pour activer le filtre XSS (Cross-Site Scripting)
  
  app.use(helmet.frameguard());  // Middleware pour configurer le cadre (frame) de l'application

  app.use(helmet.noSniff()); // Middleware pour configurer le filtre de sécurité X-Content-Type-Options

    // .use('/images', express.static(path.join(__dirname, 'images')));  // Middleware pour configurer le cadre (frame) de l'application

// Importation des routes
const restaurantRouter = require('./routes/restaurantRoutes');
const burgerRouter = require('./routes/burgerRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const { OptimisticLockError } = require('sequelize'); // Middleware pour configurer le filtre de sécurité X-Content-Type-Options

// Configuration des routes
app.use('/api/restaurants', restaurantRouter)
app.use('/api/burgers', burgerRouter)
app.use('/api/users', userRouter)
app.use('/api/reviews', reviewRouter)

// Lancement du serveur
app.listen(port, () => {
  console.log(`L'app sur le port ${port}`);
});