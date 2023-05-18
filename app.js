const express = require('express');
const morgan = require('morgan');
const serveFavicon = require('serve-favicon');
const sequelize = require('./db/sequelize')
const app = express();
const port = 5000;
const cors = require ('cors');
const path = require('path');

sequelize.initDb();

app
    .use(morgan('dev'))
    .use(serveFavicon(__dirname + '/favicon.ico'))
    .use(express.json())
    .use(cors())
    .use('/images', express.static(path.join(__dirname, 'images')));

const restaurantRouter = require('./routes/restaurantRoutes')
const burgerRouter = require('./routes/burgerRoutes')
const userRouter = require('./routes/userRoutes')
const reviewRouter = require('./routes/reviewRoutes')


app.use('/api/restaurants', restaurantRouter)
app.use('/api/burgers', burgerRouter)
app.use('/api/users', userRouter)
app.use('/api/reviews', reviewRouter)

app.listen(port, () => {
  console.log(`L'app sur le port ${port}`);
});