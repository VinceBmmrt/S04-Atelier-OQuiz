// petit MW pour avoir accès aux infos de l'user partout dans les views (grâce aux locals)
const userMiddleware = (request, response, next) => {
    if (request.session.user) {
        response.locals.user = request.session.user;
        // on prend les infos qui sont dans la SESSION (rappel : infos dans la sesion = accessibles partout dans les fichiers JS), et on les mets dans les LOCALS (rappel : infos dans les locals = accessibles partout dans les fichiers EJS, les vues)
        // locals = une sorte de grosse armoire globale, qui mets a dis des infos pour toutes les vues (image du restaurant = l'armoire avec les couverts, le sel, les sauces... pour toutes les tables) 
    } else {
        response.locals.user = null;
    }
    next();
}

module.exports = userMiddleware;