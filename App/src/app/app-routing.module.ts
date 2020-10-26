import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VievComponent } from './viev/viev.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './service/authservice';
import { OneLetterComponent } from './one-letter/one-letter.component';
import { NewLetterComponent } from './new-letter/new-letter.component';
import { EditLetterComponent } from './edit-letter/edit-letter.component';
import { DeleteLetterComponent } from './delete-letter/delete-letter.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'letters/:id', component: OneLetterComponent, canActivate: [AuthService]},
  {path: 'letters', component: VievComponent, canActivate: [AuthService]},
  {path: 'new_letter', component: NewLetterComponent, canActivate: [AuthService]},
  {path: 'edit_letter/:id', component: EditLetterComponent, canActivate: [AuthService]},
  {path: 'delete_letter/:id', component: DeleteLetterComponent, canActivate: [AuthService] },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
