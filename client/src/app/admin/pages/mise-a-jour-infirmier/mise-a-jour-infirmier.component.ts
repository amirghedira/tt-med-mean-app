import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-mise-a-jour-infirmier',
    templateUrl: './mise-a-jour-infirmier.component.html',
    styleUrls: ['./mise-a-jour-infirmier.component.css']
})
export class MiseAJourInfirmierComponent implements OnInit {

    constructor(private router: ActivatedRoute) { }

    ngOnInit() {
        this.router.queryParams
            .subscribe(params => {
                console.log(params)
            })
    }

}
