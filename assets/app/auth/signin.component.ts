import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signin',
    templateUrl:  './signin.component.html'
})
export class SigninComponent implements OnInit {
    signinForm: FormGroup;
    
    constructor(private authService: AuthService, private router:Router) {}

    ngOnInit() {
        this.signinForm = new FormGroup({
            email: new FormControl(null, [Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')
            ]),
            password: new FormControl(null, [Validators.required])
        });
    }

    onSubmit() {
        const { email, password } = this.signinForm.value;
        this.authService.signin(email, password)
        .subscribe(
            (results:any)=>{
                localStorage.setItem('token', results.token);
                localStorage.setItem('userid', results.userid);
                this.router.navigateByUrl('/');
            },
            (error:any)=>console.log(error)
        ) ;       

       // this.signinForm.reset();
    }
}
