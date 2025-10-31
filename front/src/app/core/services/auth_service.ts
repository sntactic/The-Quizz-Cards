import { User } from './../templates/user';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode';
import { Router } from '@angular/router';


interface MyTokenPayload {
    userID: string;
    userName : string;
    email : string;
    roles : string[];
    iat: number;
    exp: number;
}

interface AuthResponse {
    token: string;
    type: string;
}

@Injectable({
    providedIn : 'root'
})

export class AuthService{
    private token!: string;
    isAuth = false;
    user!:User;

    constructor(private http:HttpClient, private router : Router){};

    signUp(user : Object) : Observable<string>{
        return this.http.post('http://localhost:9000/signup' , user, {responseType : 'text'});
    };

    signIn(email: string, password: string): Observable<any> {
        return this.http.post(
            'http://localhost:9000/login',
            { username: email, password: password },
            { responseType: 'json' }
        );
    }


    getToken(): string{
        return this.token;
    }

    getUser(): User{
        return this.user;
    }

    onDisonnected(){
        this.isAuth = false;
        localStorage.removeItem("token");
        this.router.navigateByUrl('/quizzcards')
    }

    initToken(token : string , route : string){
        this.token = token;
        localStorage.setItem("token", token);
        const payload = jwtDecode<MyTokenPayload>(token);
        const newUser = new User(payload.userID,payload.userName,payload.email, payload.roles);
        this.user = newUser;
        this.isAuth = true;
        this.router.navigateByUrl(route)

    }
}