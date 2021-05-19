import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Admin } from 'src/app/types/Admin';

@Component({
    selector: 'app-doctor-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class DoctorNavBarComponent implements OnInit {

    user: Admin;
    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {

        this.authService.getCurrentUser()
            .subscribe((user: Admin) => {
                console.log(user)
                this.user = user
            })

    }
    onLogout() {
        this.authService.userLogout()
        this.router.navigate(['auth', 'login'])

    }

}
