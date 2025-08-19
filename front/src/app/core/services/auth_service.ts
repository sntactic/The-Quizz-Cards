import { User } from './../templates/user';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode';
import { Router } from '@angular/router';


interface MyTokenPayload {
    userID: string;
    name : string;
    email : string;
    iat: number;
    exp: number;
}

@Injectable({
    providedIn : 'root'
})

export class AuthService{
    private token!: string;
    isAuth = false;
    user!:User;

    constructor(private http:HttpClient, private router : Router){};

    signUp(user : Object) : Observable<Object>{
        return this.http.post<Object>('http://localhost:3000/users/signup' , user);
    };

    signIn(user : Object) : Observable< {user: any, token: string }>{
        return this.http.post<{user: any, token: string }>('http://localhost:3000/users/signin' , user);
    };

    getToken(): string{
        return this.token;
    }

    onDisonnected(){
        this.isAuth = false;
        localStorage.removeItem("token");
        this.router.navigateByUrl('/quizzcards')
    }

    initToken(token : string){
        this.token = token;
        localStorage.setItem("token", token);
        const payload = jwtDecode<MyTokenPayload>(token);
        const newUser = new User(payload.userID,payload.name,payload.email);
        this.user = newUser;
        this.isAuth = true;
    }
}