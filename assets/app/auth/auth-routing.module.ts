import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SignupComponent } from "./signup.component";
import { SigninComponent } from "./signin.component";
import { LogoutComponent } from "./logout.component";
import { AuthenticationComponent } from "./authentication.component";

const authRoutes:Routes = [
    { path: '', component: AuthenticationComponent, children: [
    {path:'', redirectTo:'signup',pathMatch:'full' },
    {path:'signup', component: SignupComponent},
    {path:'signin', component: SigninComponent},
    {path:'logout', component: LogoutComponent}
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(authRoutes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}