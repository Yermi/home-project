import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { MoviesComponent } from './Pages/movies/movies.component';
import { PageNotFoundComponent } from './Pages/page-not-found/page-not-found.component';
import { AuthGuard } from './Guard/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'secure', component: MoviesComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
