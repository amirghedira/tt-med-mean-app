import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../types/Admin';
import { Doctor } from '../types/Doctor';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {

    }

    createUser(newUser: Admin, telecomPass: string) {
        return this.http.post('http://localhost:5000/user', { user: newUser, telecomPass })
    }

}
