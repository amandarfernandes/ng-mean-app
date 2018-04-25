import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from "./app.component";
import { HeaderComponent } from './header.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { ErrorComponent } from './errors/error.component';
import { MessagesModule } from './messages/messages.module';
import { AuthService } from './auth/auth.service';
import { ErrorService } from './errors/error.service';
//import { AuthenticationComponent } from './auth/authentication.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
       // AuthenticationComponent,
        ErrorComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AuthModule,
        AppRoutingModule,
        MessagesModule
    ],
    providers: [ AuthService, ErrorService ],
    bootstrap: [AppComponent]
})
export class AppModule {

}