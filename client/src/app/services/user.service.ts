import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../types/User';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {

    }

    createUser(newUser: User, telecomPass: string) {
        return this.http.post('http://localhost:5000/user', { user: newUser, telecomPass })
    }



}
