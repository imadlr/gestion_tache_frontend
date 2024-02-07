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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DivisionComponent,
    HomeComponent,
    CurrentTasksComponent,
    CompletedTasksComponent,
    LateTasksComponent,
    ResponsibleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    NgxPaginationModule,
    FormsModule
  ],
  providers: [HttpClientModule, {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
