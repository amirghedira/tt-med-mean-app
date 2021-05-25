import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nurse',
    templateUrl: './nurse.component.html',
    styleUrls: ['./nurse.component.css']
})
export class NurseComponent implements OnInit {

    router: string;

    constructor(private _router: Router) {
        this.router = this._router.url
    }


    ngOnInit() {
    }

}
