import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { ApiService } from './services/api.service';
import { UserService } from './services/user.service';
import { HelperService } from './services/helper.service';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    // Remark: because you havent defined any routes, I have to pass an empty
    // route collection to forRoot, as the first parameter is mandatory.
    RouterModule.forRoot([]),
  ],
  providers: [
    ApiService,
    UserService,
    HelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
