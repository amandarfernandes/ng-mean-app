import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthRoutingModule } from "./auth-routing.module";
import { LogoutComponent } from "./logout.component";
import { SigninComponent } from "./signin.component";
import { AuthenticationComponent } from "./authentication.component";
import { SignupComponent } from "./signup.component";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        AuthRoutingModule,
    ],
    declarations:[
        AuthenticationComponent,
        LogoutComponent,
        SigninComponent,
        SignupComponent
    ]
})
export class AuthModule {}