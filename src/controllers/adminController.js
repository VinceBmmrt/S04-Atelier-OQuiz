const adminController = {
    renderAdminPage: (request, response) => {
        // on re-vérifie ici que l'utilisateur est bien connecté et a pour role admin
        if (request.session.user?.role === "admin") { // optional chaining : cf ci-dessous
            return response.render('admin');
        }
        response.redirect('/');
    }
}

module.exports = adminController;

// Note : request.session.user?.role => c'est la notation de l'optional chaining
// c'est équivalent à : 
// if (request.session.user && request.session.user.role === "admin")
// la syntaxe avec le "?" permet de vérifier l'existence d'une clé dans un objet avant de continuer à "avancer" dans l'arborescenec de l'objet