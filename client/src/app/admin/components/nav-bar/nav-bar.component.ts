import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/types/User';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

    user: User;
    constructor(private authService: AuthService) { }

    ngOnInit() {

        this.authService.getCurrentUser()
            .subscribe((user: User) => {
                this.user = user
            })

    }

}
