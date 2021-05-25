import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/types/User';
import * as moment from 'moment'


@Component({
    selector: 'app-doctor-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class DoctorNavBarComponent implements OnInit {

    user: User;
    currentTime: string;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        setInterval(() => {
            this.updateTime()
        }, 1000)
        this.authService.getCurrentUser()
            .subscribe((user: User) => {
                console.log(user)
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
