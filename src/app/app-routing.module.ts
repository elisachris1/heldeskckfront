import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { CallCreateComponent } from './components/call/call-create/call-create.component';
import { CallListComponent } from './components/call/call-list/call-list.component';
import { CallUpdateComponent } from './components/call/call-update/call-update.component';
import { ClientCreateComponent } from './components/client/client-create/client-create.component';
import { ClientDeleteComponent } from './components/client/client-delete/client-delete.component';
import { clientListComponent } from './components/client/client-list/client-list.component';
import { ClientUpdateComponent } from './components/client/client-update/client-update.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { TechnicianCreateComponent } from './components/technician/technician-create/technician-create.component';
import { TechnicianDeleteComponent } from './components/technician/technician-delete/technician-delete.component';
import { TechnicianListComponent } from './components/technician/technician-list/technician-list.component';
import { TechnicianUpdateComponent } from './components/technician/technician-update/technician-update.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: '', component: NavComponent, canActivate: [AuthGuard] , children:[
      {path:'home', component: HomeComponent},
      {path: 'technicians', component: TechnicianListComponent},
      {path: 'technicians/create', component: TechnicianCreateComponent},
      {path: 'technicians/update', component: TechnicianUpdateComponent},
      {path: 'technicians/delete', component: TechnicianDeleteComponent},

      {path: 'clients', component: clientListComponent},
      {path: 'clients/create', component: ClientCreateComponent},
      {path: 'clients/update', component: ClientUpdateComponent},
      {path: 'clients/delete', component: ClientDeleteComponent},

      {path: 'calls', component: CallListComponent},
      {path: 'calls/create', component: CallCreateComponent},
      {path: 'calls/update', component: CallUpdateComponent},
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
