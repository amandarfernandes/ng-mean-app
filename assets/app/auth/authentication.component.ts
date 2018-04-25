import { Component } from "@angular/core";
import { AuthService } from "./auth.service";
@Component({
    selector:'app-authentication',
    template:`
    <header class="row spacing">
        <nav class="col-md-8 col-md-offset-2">
            <ul class="nav nav-tabs">
                <li *ngIf="!isLoggedIn()" class="nav-item"><a class="nav-link" routerLink="signup" routerLinkActive="active" >Signup</a></li>
                <li *ngIf="!isLoggedIn()" class="nav-item"><a class="nav-link" routerLink="signin" routerLinkActive="active">Signin</a></li>
                <li *ngIf="isLoggedIn()" class="nav-item"><a class="nav-link" routerLink="logout" routerLinkActive="active">Logout</a></li>
            </ul>
        </nav>
    </header>
    <div class="row spacing">
        <router-outlet></router-outlet>
    </div>
    `
})
export class AuthenticationComponent {
    constructor(private authService:AuthService) {}

    isLoggedIn() {
        return this.authService.isSignedin();
    }


}