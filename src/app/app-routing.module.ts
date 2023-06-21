import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/error-pages/not-found/not-found.component';
import { InternalServerComponent } from './components/error-pages/internal-server/internal-server.component';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'products', loadChildren: () => import('./components/products/products.module').then(m => m.ProductsModule), canActivate: [AuthGuard]},
  { path: 'rents', loadChildren: () => import('./components/rents/rents.module').then(m => m.RentsModule), canActivate: [AuthGuard]},
  { path: 'database', loadChildren: () => import('./components/database-information/database-information.module').then(m => m.DatabaseInformationModule), canActivate: [AuthGuard]},
  { path: 'about', loadChildren: () => import('./components/about/about.module').then(m => m.AboutModule), canActivate: [AuthGuard] },
  
  { path: '500', component: InternalServerComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
