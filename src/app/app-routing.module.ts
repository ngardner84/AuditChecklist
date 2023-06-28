import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component'
import { StudentsComponent } from './students/students.component'
import { LoginpageComponent } from './loginpage/loginpage.component'
import { AuthGuard } from 'src/authentication/auth.guard';

const routes: Routes = [
  { path: 'homepage', component: HomepageComponent, canActivate: [AuthGuard] },
  { path: 'students', component: StudentsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginpageComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
