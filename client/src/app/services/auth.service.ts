import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../types/User';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    token: string;
    loggedUser: User
    constructor(private http: HttpClient) {
        if (localStorage.getItem('access_token'))
            this.token = localStorage.getItem('access_token')
        else
            this.token = null
    }

    userLogin(username: string, password: string) {

        return this.http.post('http://localhost:5000/user/login', { username, password })
    }
    userLogout() {
        this.token = null;
        this.loggedUser = null
    }
    getConnectedUser() {
        return this.http.get<User>('http://localhost:5000/user/connected-user')
    }
    setCurrentUser(user: User) {
        this.loggedUser = user
    }
    getCurrentUser() {
        return this.loggedUser
    }

    getToken() {
        return this.token;
    }
    setToken(token: string) {
        localStorage.setItem('access_token', token);
        this.token = token;
    }
}
