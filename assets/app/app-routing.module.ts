import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessagesComponent } from './messages/messages.component';
import { AuthenticationComponent } from './auth/authentication.component';

const appRoutes: Routes =[
    { path: '', redirectTo: '/messages', pathMatch:'full'},
    { path: 'messages', component: MessagesComponent },
    { path: 'auth', loadChildren:'./auth/auth.module#AuthModule' }
    //{ path: 'auth', component: AuthenticationComponent, loadChildren:'./auth/auth.module#AuthModule' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
    
}