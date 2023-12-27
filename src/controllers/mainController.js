// on require les models exportés par le fichier d'index (qui contient les associations)
const { Quiz } = require("../models/index.js");

const mainController = {
  async renderHomePage(req, res) {
    // cette méthode du controleur rends la vue "home.ejs"
    // = interprète le contenu du fichier ejs, et le transforme en page HTML avec les bonnes données
    // c'est ici qu'on va récupérer les données dans la db, et les "passer à la vue"
    // les méthodes de sequelize sont asynchrones : donc on utulise async/await
    const quizList = await Quiz.findAll({
      include: ["author", "tags"],
      order: [['created_at', 'DESC']]
    });
    // console.log(quizList);

    res.render("home", { quizList });
  }
};

module.exports = mainController;
