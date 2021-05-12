import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Admin } from '../types/Admin';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    token: string;
    loggedUser: BehaviorSubject<Admin>;
    constructor(private http: HttpClient) {
        this.token = localStorage.getItem('access_token')
        this.loggedUser = new BehaviorSubject(null)
    }

    checkUser() {
        if (this.token) {
            this.getConnectedUser().subscribe((reponse: any) => {
                this.setCurrentUser(reponse.connectedUser);

            }, err => {
                this.userLogout()
            })
        }
    }
    userLogin(username: string, password: string) {

        return this.http.post('http://localhost:5000/user/login', { username, password })
    }
    userLogout() {
        localStorage.removeItem('access_token')
        this.token = null;
        this.setCurrentUser(null)
    }
    getConnectedUser() {
        console.log('heee')
        return this.http.get<Admin>('http://localhost:5000/user/connected-user')
    }
    setCurrentUser(user: Admin) {
        this.loggedUser.next(user)
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
