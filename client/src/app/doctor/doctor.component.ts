import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-doctor',
    templateUrl: './doctor.component.html',
    styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

    router: string;

    constructor(private _router: Router) {
        this.router = this._router.url
    }

    ngOnInit() {
    }

}
