import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as moment from 'moment'
import { User } from 'src/app/types/User';
@Component({
    selector: 'app-admin-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class AdminNavBarComponent implements OnInit {

    user: User;
    currentTime: string;
    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        setInterval(() => {
            this.updateTime()
        }, 1000)
        this.authService.getCurrentUser()
            .subscribe((user: User) => {
                this.user = user
            })


    }
    updateTime() {
        this.currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
    }
    onLogout() {
        this.authService.userLogout()
        this.router.navigate(['auth', 'login'])

    }

}
