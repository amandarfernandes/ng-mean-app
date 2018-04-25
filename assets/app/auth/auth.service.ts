import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";

import { User } from "./user.model";
import { Observable } from "rxjs/Observable";
import { ErrorService } from "../errors/error.service";

@Injectable()
export class AuthService {
    url = 'http://localhost:3000/user';

    constructor(private http: HttpClient, private errorService: ErrorService) {}
    
    signup(user: User) {
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
            })
          };
        return this.http.post(
            this.url+'/signup',
            JSON.stringify(user),
            httpOptions
        ).map((response: any)=>response)
        .catch((error:HttpErrorResponse)=> { 
            this.errorService.handleError(error);
            return Observable.throw(error)});
    }


    signin(email: String, password: String) {
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
            })
          };
        return this.http.post(
            this.url+'/signin',
            JSON.stringify({email:email,password:password}),
            httpOptions
        ).map((response: any)=>response)
        .catch((error:HttpErrorResponse)=> { 
            this.errorService.handleError(error);
            return Observable.throw(error)});
    }

    signout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userid');
    }

    isSignedin() {
        return localStorage.getItem('token') !== null;
    }
}
