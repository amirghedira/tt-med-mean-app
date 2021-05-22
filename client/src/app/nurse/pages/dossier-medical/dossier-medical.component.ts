import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Agent } from 'src/app/types/Agent';
import { DossierMedical } from 'src/app/types/DossierMedical';
import { FamilyMember } from 'src/app/types/FamilyMember';
import { NurseService } from '../../nurse.service';
import Swal from 'sweetalert2'
import { ViewChild } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
    selector: 'app-dossier-medical',
    templateUrl: './dossier-medical.component.html',
    styleUrls: ['./dossier-medical.component.css']
})
export class DossierMedicalComponent implements OnInit {

    dossierMedical: DossierMedical;
    editedDossierMedical: any;
    loadingUploadDossierImage: boolean = false;
    loadingUploadBiologyImage: boolean = false;
    owner: Agent | FamilyMember;
    isEditing: boolean;
    @ViewChild('fileDossierImage', { static: true }) fileDossierImage: ElementRef;
    @ViewChild('fileBiologyImage', { static: true }) fileBiologyImage: ElementRef;

    constructor(private nurseService: NurseService, private route: ActivatedRoute, private ngxSpinnerService: NgxSpinnerService) {
        this.isEditing = false;
        this.ngxSpinnerService.show()
    }

    ngOnInit() {
        this.route.params
            .subscribe(params => {
                this.nurseService.getDossierMedical(params.id)
                    .subscribe((res: any) => {
                        if (!res.dossierMedical.image) {
                            res.dossierMedical.image = 'assets/images/default-avatar.png'
                        }
                        this.dossierMedical = JSON.parse(JSON.stringify(res.dossierMedical))
                        this.editedDossierMedical = JSON.parse(JSON.stringify(res.dossierMedical))
                        if (res.dossierMedical.type === 'agent') {
                            this.owner = res.dossierMedical.agent
                        } else {
                            this.owner = res.dossierMedical.familyMember
                        }
                    }, err => {
                        console.log(err)
                    })
            })
    }

    onChangeBiologyImage(event) {
        const fd = new FormData()
        fd.append('biology-image', event.target.files[0])
        this.loadingUploadBiologyImage = true;
        this.nurseService.uploadBiologyImage(this.editedDossierMedical._id, fd)
            .subscribe((res: any) => {
                console.log(res)
                this.loadingUploadBiologyImage = false;
                if (this.editedDossierMedical.biologiques)
                    this.editedDossierMedical.biologiques.history.push(this.editedDossierMedical.biologiques.current)
                else
                    this.editedDossierMedical.biologiques.history = [this.editedDossierMedical.biologiques.current]

                this.editedDossierMedical.biologiques.current = res.newImage
                this.dossierMedical = JSON.parse(JSON.stringify(this.editedDossierMedical))

            }, err => {
                console.log(err)
            })
    }
    onChangeDossierImage(event) {
        const fd = new FormData()
        fd.append('dossier-image', event.target.files[0])
        this.loadingUploadDossierImage = true;
        this.nurseService.uploadDossierMedicalImage(this.editedDossierMedical._id, fd)
            .subscribe((res: any) => {

                this.loadingUploadDossierImage = false;
                this.editedDossierMedical.image = res.newImage
                this.dossierMedical = JSON.parse(JSON.stringify(this.editedDossierMedical))
            }, err => {
                console.log(err)
            })
    }
    importDossierImage() {
        if (this.isEditing) {
            this.fileDossierImage.nativeElement.click()

        }
    }
    importBiologyImage() {
        this.fileBiologyImage.nativeElement.click()
    }
    onToggleEdit() {
        this.isEditing = !this.isEditing
        this.editedDossierMedical = JSON.parse(JSON.stringify(this.dossierMedical))
    }
    onValidate() {
        this.dossierMedical = JSON.parse(JSON.stringify(this.editedDossierMedical))
        this.nurseService.updateDossierMedical(this.editedDossierMedical._id, this.editedDossierMedical)
            .subscribe(res => {
                Swal.fire(
                    'Sucess',
                    'Le dossier a été modifié',
                )
                this.isEditing = false;
            })

    }

}
