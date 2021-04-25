import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertComponent} from '../alert/alert.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {RestService} from "../rest.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
    uploadForm: FormGroup;
    readonly acceptedImageTypes = ['text/csv'];
    public files = [];
    selectedFile: File;
    public fileName: string;

    constructor(private formBuilder: FormBuilder,
                public dialog: MatDialog,
                private router: Router,
                private restService: RestService
    ) {
    }

    ngOnInit(): void {
        this.setForm();
    }

    setForm(): void {
        this.uploadForm = this.formBuilder.group({
            csvFile: [null, Validators.required],
        });
    }

    onUpload(event): void {
        if (!event.target.files[0]) {
            return;
        }
        if (!this.acceptedImageTypes.includes(event.target.files[0].type)) {
            const dialogRef = this.dialog.open(AlertComponent, {
                data: 'Wrong file extension.',
            });
            return;
        }
        this.files = [];
        this.files.push(event.target.files);
        this.fileName = this.files[0][0].name;
        this.selectedFile = this.files[0][0];
        const file = (event.target as HTMLInputElement).files[0];
        this.uploadForm.patchValue({csvFile: this.selectedFile});
        this.uploadForm.get('csvFile').updateValueAndValidity();
    }

    onSubmit(): void {
        let body = new FormData();
        body.append('subfile', this.formControls.csvFile.value);
        body.set('import_file', this.selectedFile, this.selectedFile.name);
        let obs = this.restService.postFile(body);
        obs.subscribe(
            () => {
                this.router.navigate(['./report']);
            },
            (error) => {
                const dialogRef = this.dialog.open(AlertComponent, {
                    data: 'Something went wrong.',
                });
                return;
            }
        )
    }


    get formControls() {
        return this.uploadForm.controls;
    }
}
