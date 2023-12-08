const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const indexRoutes = require('./routes/index');
const linksRoutes = require('./routes/links');
const connectDb = require('./config/db');

//Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(indexRoutes);
app.use('/links', linksRoutes);

connectDb().then(() => {
    app.listen(PORT, (err) => {
        err ? console.log('Error connect to server', err) : console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.log('Error connection to DB', JSON.stringify(err));
});