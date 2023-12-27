const validator = require("email-validator");
const bcrypt = require('bcrypt');

const { User } = require("../models/index.js");

const userController = {
    renderSignupPage : (request, response) => {
        response.render('signup.ejs')
    },

    renderLoginPage: (request, response) => {
        response.render('login.ejs')
    },

    createUser: async (request, response) => {
        // méthode qui a pour role de créer un nouvel utilisateur dans la db, avecles infos fournies dansle form

        // 1. on récuère les données du form
        // les données sont envoyées en POST donc elles se trouvent dans le body
        // pour y avoir accès Express nous fournit la variable request.body
        // attention il faut ajouter  un bodyparser (dans index.js)
        const body = request.body;
        // console.log(body);

        // 2. on fait des vérifications + hachage du mot de passe

        // vérifier les cas d'erreurs
        // - 1) toutes les informations ne sont pas présentes
        if (!body.firstname || !body.lastname || !body.email || !body.password) {
            response.render('signup', {
                error: "Toutes les informations nécessaires n'ont pas été transmises."
            })
        }

        // - 2) le format de l'email n'est pas valide
        // on utilise un petit outil npm : email validator (cf la doc : https://www.npmjs.com/package/email-validator)
        // il renvoie "true" si le format d'email est valide
        if (!validator.validate(body.email)) {
            response.render('signup', {
                error: "Cet email n'est pas valide."
            })
        }


        // - 3) un utilisateur avec cet email existe déja dans la base de données
        const userFound = await User.findOne({ 
            where: { 
                email: body.email 
            } 
        });
        if (userFound) {
            response.render('signup', {
                error: "Cet email est déja utilisé par un utilisateur."
            })
        }

        // - 4) le mdp et sa confirmation ne correspondent pas
        if (body.password !== body.confirmation) {
            response.render('signup', {
                error: "Le mot de passe et la confirmation ne correspondent pas. Essaie encore !"
            })
        }

        // ( il faudrait vérifier aussi que le mdp réponde aux recomendations de la CNIL... )
        // on pourrait même carrément utiliser un validator par exemple Joi : cf. la doc : https://www.npmjs.com/package/joi
        // autre amélioration : gestion d'erreurs (404 / 500 ...) + renseigner le status codes HTTP

        // si on arrive jusqu'ici c'est qu'iln'y a pas eu d'erreur        
        // 3. une fois toutes les vérifications validées : ajouter les infos dans la base de donnée

        // on encrypte le mot de passe. Outils : bcrypt (doc: https://www.npmjs.com/package/bcrypt)
        // pour encrypter le mot de passe de manière "forte" on ajoute un "salt" (un grain de sel) = un mot de passe secret du style "gegerg545ze4fqzef" généré aléatoirement, donc personne ne le connaît
        // le second paramètre de la fonction hashSync est un nombre pour dire à bcrypt la taille du "salt" => plus c'est long, mieux c'est encrypté, mais plus ça prend du temps !)
        const encryptedPassword = bcrypt.hashSync(body.password, 10);

        // on va créer un user, une instance de User :
        const newUser = new User({
            firstname: body.firstname,
            lastname: body.lastname,
            email: body.email,
            // password: body.password, // NON : on ne va pas stocker le mot de passe comme ça en clair dans la db
            password: encryptedPassword,
            role: 'membre' // on ajoute le mole "membre" par default pour que tout nouvel user créé soit par default avecle role "membre"
        })
        // et on demande à Sequelize de l'inscrire en bas de donnée 
        await newUser.save();

        // on peut aussi faire avec .create comme ceci :
        /*await User.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            // password: body.password, // NON : on ne va pas stocker le mot de passe comme ça en clair dans la db
            password: encryptedPassword,
            role: 'membre'
        })*/

        // une fois inscrit, on redirige l'utilisateur vers la page de login pour qu'il se connecte
        response.redirect('/login');
    },

    loginUser: async (request, response) => {
        // 1. récupérer les infos de connexion depuis le form
        // const email = request.body.email;
        // const password = request.body.password;
        //  encore mieux avec le destructuring :
        const { email, password } = request.body;

        // 2. on vérifie que l'utilisateur avec cet email existe dans la db
        const userFound = await User.findOne({
            where: { email } // idem : where { email: email } (notation ES6)
        })
        // 3. si on a un utilisateur on vérifie que le mot de passe soit valide
        // on utilise de nouveau bcrypt pour vérifier le mot de passe 
        const validPassword = bcrypt.compareSync(password, userFound.password);

        if(!userFound || !validPassword){
            return response.render('login', {
                error: "Email ou mot de passe incorrect."
                // on mets le même message d'erreur pour les 2 cas afin de ne pas donner d'infos a de potentiels utilisateur malveillants (si mot de passe incrrect : on pet en déduire que l'email existe !)
            })
        }

        // si on arrive ici c'st que c'est tout bon, on peut connecter l'utilisateur :

        // 4. stocker l'utilisateur dans une session (pour maintenir la connexion)
        // avant on supprime son mot de passe ! même crypté,on n'a pas besoin de stocker le pwd, donc on le delete c'est toujours mieux
        userFound.password = null;
        request.session.user = userFound;
        // grâce à la session, partout (dans le JS) on peut faire request.session.user.firstname pour connaitre le prénom de l'utilisateur connecté.
        // par exemple on peut fair eun petit MW (dans l'index) pour le stocker dans les locals (pour y avoir accès dans les views ejs)

        // 5. On redirige vers l'accueil
        response.redirect('/');
    },

    logoutUser: (request, response) => {
        // on supprime l'utilisateur de la session
        request.session.user = null;
        response.redirect('/');
    },

    renderProfilePage: (request, response) => {
        if (!request.session.user) {
            return response.redirect('/login');
        }

        console.log(request.session.user);
        // j'ai pas besoin d'aller chercher les infos dans la db, ne mêm de les envoyer à la vue ici : la vue y a déja accès puisqu'elles sont dans les locals (grâce au MW)
        response.render('profile');
    } 
}

module.exports = userController;