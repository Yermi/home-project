var moviesService = require('../services/moviesService');
var moment = require('moment');

module.exports = {
    GetMovies: (req, res) => {
        var catagory = req.query.catagory;
        try {
            if (!catagory) {
                throw new Error("לא נבחרה קטגוריה")
            }
            var movies = moviesService.GetMoviesByCatagory(catagory);
            res.status(200).send(movies);

        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    GetCatagories: (req, res) => {
        var catagories = moviesService.GetAll().map(m => m.Catagory).distinct();
        res.status(200).send(catagories);
    },

    AddMovie: (req, res) => {
        //validate 
        var movie = req.body.movie
        console.log(movie);

        movie.DateAddad = moment().format("YYYY-MM-DDTHH:mm:ss")
        try {
            moviesService.AddMovie(movie);
            res.status(200).send("נוסף בהצלחה");
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    DeleteMovie: (req, res) => {
        var movie = req.query.name;
        if (moviesService.DeleteMovie(movie)) {
            res.status(200).send("נמחק בהצלחה");
        }
        else {
            res.status(400).send("אירעה שגיאה");
        }
    }
}


Array.prototype.distinct = function () {
    return this.filter((value, index, self) => {
        return self.indexOf(value) === index;
    })
}