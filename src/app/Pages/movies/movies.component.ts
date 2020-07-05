import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/Services/movies.service';
import { LoginService } from 'src/app/Services/login.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Movie } from 'src/app/Models/Movie';
import { ToastService, ToastType } from 'src/app/Services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  angForm: FormGroup;
  constructor(
    private moviesService: MoviesService,
    private loginService: LoginService,
    private ngxSmartModalService: NgxSmartModalService,
    private toastService: ToastService) {
  }

  ngOnInit() {
    this.moviesService.GetAllCatagories();
  }

  movie: Movie;
  errors: string;
  catagories: string[] = ["קומדיה", "מלחמה", "דרמה", "פעולה"]

  FetchByCatagory(index) {
    console.log(index);
    console.log(this.moviesService.Catagories[index]);
    this.moviesService.GetMovies(this.moviesService.Catagories[index]).subscribe(
      (res) => {
        console.log(res);
        
      },
      (err: HttpErrorResponse) => {
        this.toastService.popToast(ToastType.Error, err.error);
      }
    )
    
  }

  Remove(index: number) {
    this.moviesService.Remove(index).subscribe(
      (res) => {
        console.log(res);
        this.toastService.popToast(ToastType.Success, res);
        var movie = this.moviesService.Movies[index];
        var catagory = movie.Catagory;
        this.moviesService.Movies.splice(index, 1);
        if (this.moviesService.Movies.length == 0) {
          var indexToRemove = this.moviesService.Catagories.findIndex(c => c == catagory);
          this.moviesService.Catagories.splice(indexToRemove, 1);
        }
      },
      (err) => {
        this.toastService.popToast(ToastType.Error, err);
        console.log(err);
      }
    )
  }

  OpenAddMovieModal() {
    console.log('OpenAddMovieModal');
    this.movie = new Movie();
    this.ngxSmartModalService.getModal('AddMovieModal').open();
  }

  AddMovie() {
    this.errors = "";
    console.log('AddMovie');
    console.log(this.movie);
    if (!this.movie.Name) {
      this.errors = "חובה להכניס שם הסרט"
      return;
    }
    if (!this.movie.Catagory) {
      this.errors = "חובה לבחור קטגוריה"
      return;
    }
    if (!this.movie.Imdb) {
      this.errors = "חובה להוסיף קישור לIMDB"
      return;
    }
    if (!this.movie.Poster) {
      this.errors = "חובה להכניס קישור לפוסטר"
      return;
    }
    if (!this.isValidURL(this.movie.Imdb) || !this.movie.Imdb.includes('imdb')) {
      this.errors = "בשדה IMDB יש להוסיף קישור IMDB בלבד"
      return;
    }
    if (!this.imageExists(this.movie.Poster)) {
      this.errors = "לינק לפוסטר לא חוקי"
      return;
    }
    
    console.log(this.movie);
    this.moviesService.AddMovie(this.movie).subscribe(
      (res) => {
        console.log(res);
        this.toastService.popToast(ToastType.Success, res);
        this.moviesService.Movies.push(this.movie)
        if (!this.moviesService.Catagories.includes(this.movie.Catagory)) {
          this.moviesService.Catagories.push(this.movie.Catagory)
        }
        this.ngxSmartModalService.getModal('AddMovieModal').close();
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
        this.toastService.popToast(ToastType.Error, err.error);
      }
    )
  }

  isValidURL(string) {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
  };

  imageExists(url){

    var image = new Image();
    image.src = url;
    console.log(image);
    
    if (!image.complete) {
        return false;
    }
    else if (image.height === 0) {
        return false;
    }
    return true;
}
}
