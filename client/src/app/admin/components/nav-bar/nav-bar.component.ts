import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Admin } from 'src/app/types/Admin';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

    user: Admin;
    constructor(private authService: AuthService) { }

    ngOnInit() {

        this.authService.getCurrentUser()
            .subscribe((user: Admin) => {
                console.log(user)
                this.user = user
            })

    }

}
