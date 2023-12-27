const { Quiz } = require("../models/index.js");

const quizController = {
  async renderQuizPage(req, res) {

    if (!req.session.user) {
      return res.status(401).render("401.ejs");
    } 

    const quizId = req.params.id;
    // on récupère un quiz : celui avec l'id qui se trouve dans l'url

    const quiz = await Quiz.findByPk(quizId, {
      include: [
        { association: "author" },
        { association: "tags" },
        { 
          association: "questions",
          include: ["propositions", "level"]
        },
      ],
    });
    // console.log(quiz);

    res.render("quiz.ejs", { quiz });
  }
};

module.exports = quizController;
