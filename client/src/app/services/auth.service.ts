import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Admin } from '../types/Admin';
import { User } from '../types/User';
@Injectable({
    providedIn: 'root'
})
export class AuthService {

    token: string;
    loggedUser: BehaviorSubject<User>;
    isConnected: BehaviorSubject<Boolean>
    constructor(private http: HttpClient) {
        this.token = localStorage.getItem('access_token')
        this.loggedUser = new BehaviorSubject(null)
        this.isConnected = new BehaviorSubject(null)
    }

    checkUser() {
        if (this.token) {
            this.getConnectedUser().subscribe((reponse: any) => {
                this.setCurrentUser(reponse.connectedUser);
                this.isConnected.next(true)


            }, err => {
                this.userLogout()
            })
        } else {
            this.isConnected.next(false)
        }
    }
    userLogin(username: string, password: string) {

        return this.http.post('http://localhost:5000/user/login', { username, password })
    }
    userLogout() {
        localStorage.removeItem('access_token')
        this.token = null;
        this.isConnected.next(false)
        this.setCurrentUser(null)
    }
    createUser(newUser: Admin, telecomPass: string) {
        return this.http.post('http://localhost:5000/user', { user: newUser, telecomPass }, { observe: 'response' })
    }
    getConnectedUser() {
        return this.http.get<User>('http://localhost:5000/user/connected-user')
    }
    setCurrentUser(user: User) {
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
