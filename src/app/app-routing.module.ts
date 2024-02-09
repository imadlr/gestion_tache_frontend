import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {DivisionComponent} from "./division/division.component";
import {GuardService} from "./services/guard.service";
import {ResponsibleComponent} from "./responsible/responsible.component";

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
