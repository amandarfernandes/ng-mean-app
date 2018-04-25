import { Component } from "@angular/core";

@Component({
    selector:'app-header',
    template:`
    <header class="row">
        <nav class="col-md-8 col-md-offset-2">
            <ul class="nav nav-pills nav-fill">
                <li class="nav-item">
                <a 
                class="nav-link"
                routerLink="/messages" 
                routerLinkActive="active">
                Messenger</a></li>
                <li class="nav-item">
                <a  
                class="nav-link"
                routerLink="/auth" 
                routerLinkActive="active">
                Authentication</a></li>
            </ul>
        </nav>
    </header>
    `
})
export class HeaderComponent {}