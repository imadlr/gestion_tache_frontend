import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {DivisionComponent} from "./division/division.component";
import {GuardService} from "./services/guard.service";
import {ResponsibleComponent} from "./responsible/responsible.component";
import {OperatorComponent} from "./operator/operator.component";
import {AdminComponent} from "./admin/admin.component";

const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'division', component: DivisionComponent,
    canActivate: [GuardService],
    data: {
      ['expectedRoles']: ['DIVISION']
    }
  },
  {
    path: 'responsible', component: ResponsibleComponent,
    canActivate: [GuardService],
    data: {
      ['expectedRoles']: ['RESPONSIBLE']
    }
  },
  {
    path: 'sec', component: OperatorComponent,
    canActivate: [GuardService],
    data: {
      ['expectedRoles']: ['SECRETARY']
    }
  },
  {
    path: 'admin', component: AdminComponent,
    canActivate: [GuardService],
    data: {
      ['expectedRoles']: ['ADMIN']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
