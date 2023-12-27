const { Router } = require("express");

const mainController = require("./controllers/mainController");
const quizController = require("./controllers/quizController");
const userController = require("./controllers/userController");
const adminController = require("./controllers/adminController");

const adminMiddleware = require('./middlewares/adminMiddleware.js');

const router = Router();

router.get("/", mainController.renderHomePage);
router.get("/quiz/:id", quizController.renderQuizPage);

// inscription
router.get("/signup", userController.renderSignupPage);
router.post("/signup", userController.createUser);

// connexion
router.get("/login", userController.renderLoginPage);
router.post("/login", userController.loginUser);

// déconnexion
router.get('/logout', userController.logoutUser);

// page de profil
router.get('/profile', userController.renderProfilePage);

// page d'admin
router.get('/admin', adminMiddleware, adminController.renderAdminPage);

module.exports = router;
