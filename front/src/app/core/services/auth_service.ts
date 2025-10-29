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
        return this.http.get<Object>('http://localhost:3000/users/signup' , user);
    };

    signIn(email: string, password: string): Observable<string> {
        const credentials = btoa(`${email}:${password}`);

        const headers = new HttpHeaders({
            'Authorization': `Basic ${credentials}`
        });

        return this.http.post('http://localhost:9000/login',
            {},
            { headers, responseType: 'text'}
        )
    }


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
        const newUser = new User(payload.userID,payload.userName,payload.email);
        console.log(newUser);
        this.user = newUser;
        this.isAuth = true;
    }
}