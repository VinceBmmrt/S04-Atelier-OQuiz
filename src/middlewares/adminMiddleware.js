const adminMiddleware = (request, response, next) => {
    // ce MW a pour role de lboquer l'accès à toute personne n'étant pas connecté en tant qu'admin
    if (!request.session.user) {
        return response.redirect('/login');
    }

    if (request.session.user.role === "admin") {
        // c'est tout bon, on continue !
        next();
    } else {
        return response.status(403).render('403.ejs');
    }
}

module.exports = adminMiddleware;