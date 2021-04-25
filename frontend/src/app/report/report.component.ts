import {Component, OnInit} from '@angular/core';
import {RestService} from "../rest.service";

export interface CustomerData {
    customerId: number;
    totalLocalCalls: number;
    totalLocalDuration: number;
    totalCalls: number;
    totalDuration: number;
}

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {

    customersData = [];
    error = false;
    isLoading = true;
    columnsToDisplay = [
        'customerId',
        'totalLocalCalls',
        'totalLocalDuration',
        'totalCalls',
        'totalDuration',
    ];

    constructor(private restService: RestService) {
    }

    ngOnInit(): void {
        this.getData();
    }

    getData() {
        this.restService.getData('getData').subscribe(
            (response) => {
                const result = JSON.parse(response);
                for (const [key, value] of Object.entries(result.data)) {
                    this.customersData.push(value);
                }
                this.isLoading = false
            }, (error) => {
                this.error = true;
            }
        );
    }
}
