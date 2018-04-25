import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { User } from './user.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
    
})
export class SignupComponent implements OnInit {
    signupForm: FormGroup;
    constructor(private authService: AuthService, private router: Router) {}
    ngOnInit() {
        this.signupForm = new FormGroup({
            firstName: new FormControl(null,Validators.required),
            lastName:new FormControl(null,Validators.required),
            email: new FormControl(null,[Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')]),
            password:new FormControl(null,Validators.required)
        });
    }

    onSubmit() {
        //console.log(this.signupForm.value);
        const {email,password,firstName,lastName} = this.signupForm.value;
        const user = new User(email,password,firstName,lastName);
        //console.log(user);
        this.authService.signup(user)
            .subscribe(
                (response:any)=>{
                   localStorage.setItem('token', response.token);
                    localStorage.setItem('userid', response.userid);
                    this.router.navigateByUrl('/');
                }
            );
        this.signupForm.reset();
    }
}