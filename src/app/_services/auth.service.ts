import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

interface User {
    username: string;
    password: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    url = environment.url;

    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<User>(this.url + "auth/login", {
            username,
            password
        }, { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } })
    }
}