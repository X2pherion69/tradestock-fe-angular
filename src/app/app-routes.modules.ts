import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from 'core/services/auth-guard.service';
import { NotFoundPageComponent } from 'pages/shared/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [{ path: 'home', component: HomeComponent }],
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
