// Charger les variables d'environnement
const dotenv = require("dotenv");
dotenv.config();

// Importer les dependances
const express = require("express");
const router = require("./src/router");
const session = require('express-session');
const userMiddleware = require('./src/middlewares/userMiddleware.js')

// Création de l'application express
const app = express();

// Configurer le view engine
app.set("view engine", "ejs");
app.set("views", "./src/views");

// On expose le contenu du dossier public au reste du monde
app.use(express.static("public")); // Ca revient à déclarer une route par fichier en quelque sorte

// Notre body parser pour les requêtes POST
app.use(express.urlencoded({ extended: true }));

// Sessions
app.use(session({
  secret: 'un super mot de passe secret de ouf',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false } // attention : il faut bien mettre secure: false quand on n'est pas en HTTPS, sinon cela empêche la session de fonctionner correctement (merci Vincent)
}));

app.use(userMiddleware);

// On plug le router
app.use(router);

// Lancer l'application
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
