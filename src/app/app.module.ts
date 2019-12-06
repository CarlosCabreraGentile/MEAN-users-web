import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Routing module
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { ToastrModule } from 'ngx-toastr';
import { ApiService } from './services/api.service';
import { HelperService } from './services/helper.service';
import { JustNumberDirective } from './shared/just-number.directive';
import { UserService } from './services/user.service';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { UsersComponent } from './components/users/users.component';
import { UsersListComponent } from './components/users-list/users-list.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UsersListComponent,
    JustNumberDirective,
    MainLayoutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,
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
