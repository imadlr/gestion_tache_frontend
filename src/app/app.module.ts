import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "./interceptors/token.interceptor";
import {DivisionComponent} from "./division/division.component";
import { HomeComponent } from './division/home/home.component';
import {CommonModule} from "@angular/common";
import {CurrentTasksComponent} from "./division/current-tasks/current-tasks.component";
import {NgxPaginationModule} from "ngx-pagination";
import { CompletedTasksComponent } from './division/completed-tasks/completed-tasks.component';
import { LateTasksComponent } from './division/late-tasks/late-tasks.component';
import { ResponsibleComponent } from './responsible/responsible.component';
import { CurrentTasksRespComponent } from './responsible/current-tasks-resp/current-tasks-resp.component';
import { HomeRespComponent } from './responsible/home-resp/home-resp.component';
import { AgendaComponent } from './responsible/agenda/agenda.component';
import { CompletedTasksRespComponent } from './responsible/completed-tasks-resp/completed-tasks-resp.component';
import { OrderByDatePipe } from './pipes/order-by-date.pipe';
import { LateTasksRespComponent } from './responsible/late-tasks-resp/late-tasks-resp.component';
import { OperatorComponent } from './operator/operator.component';
import { CurrentTasksSecComponent } from './operator/current-tasks-sec/current-tasks-sec.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskDialogComponent } from './operator/dialog/task-dialog/task-dialog.component';
import {MaterialModule} from "./material/material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatFormFieldModule} from "@angular/material/form-field";
import { CompletedTasksSecComponent } from './operator/completed-tasks-sec/completed-tasks-sec.component';
import { LateTasksSecComponent } from './operator/late-tasks-sec/late-tasks-sec.component';
import { AgendaSecComponent } from './operator/agenda-sec/agenda-sec.component';
import { RespChoiceComponent } from './operator/dialog/resp-choice/resp-choice.component';
import { AgendaDialogComponent } from './operator/dialog/agenda-dialog/agenda-dialog.component';
import { AdminComponent } from './admin/admin.component';
import { DivisionsComponent } from './admin/divisions/divisions.component';
import { ResponsiblesComponent } from './admin/responsibles/responsibles.component';
import { SecretariesComponent } from './admin/secretaries/secretaries.component';
import { DivisionDialogComponent } from './admin/dialog/division-dialog/division-dialog.component';
import { ResponsibleDialogComponent } from './admin/dialog/responsible-dialog/responsible-dialog.component';
import { SecretaryDialogComponent } from './admin/dialog/secretary-dialog/secretary-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DivisionComponent,
    HomeComponent,
    CurrentTasksComponent,
    CompletedTasksComponent,
    LateTasksComponent,
    ResponsibleComponent,
    CurrentTasksRespComponent,
    HomeRespComponent,
    AgendaComponent,
    CompletedTasksRespComponent,
    OrderByDatePipe,
    LateTasksRespComponent,
    OperatorComponent,
    CurrentTasksSecComponent,
    TaskDialogComponent,
    CompletedTasksSecComponent,
    LateTasksSecComponent,
    AgendaSecComponent,
    RespChoiceComponent,
    AgendaDialogComponent,
    AdminComponent,
    DivisionsComponent,
    ResponsiblesComponent,
    SecretariesComponent,
    DivisionDialogComponent,
    ResponsibleDialogComponent,
    SecretaryDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [HttpClientModule, {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
