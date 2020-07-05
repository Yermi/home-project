var initialMovies = require('../data/movies.json');


movies = [];
module.exports = {
    InitMovies: function () {
        movies = initialMovies;
    },
    GetAll: function () {
        if (movies.length == 0) {
            this.InitMovies();
        }
        return movies.sort((a,b) => { return a.DateAdded > b.DateAdded});
    },

    GetMoviesByCatagory: function (catagory) {
        return this.GetAll().filter(m => m.Catagory == catagory);
    },

    GetCatagories: function () {
        var catagories = this.GetAll().map(m => m.Catagory).distinct();
        return catagories;
    },

    AddMovie: function (movie) {        
        if (movies.map(m => m.Name).includes(movie.Name)) {
            throw new Error("סרט קיים במאגר");
        }
        movies.push(movie)
    },

    DeleteMovie: function (name) {
        var index = movies.findIndex(m => m.Name == name)
        if (index > -1) {
            movies.splice(index, 1);
            return true;
        }
        return false;
    }
}