import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RestService {

    url = 'http://localhost:8000';

    constructor(private http: HttpClient) {
    }


    get httpOptions() {
        const headers = {};
        headers['Access-Control-Allow-Origin'] = '*';
        headers['Content-type'] = 'text/csv';
        // headers['Access-Control-Allow-Origin'] = 'http://localhost:8000';
        headers['Access-Control-Allow-Credentials'] = 'true';
        return headers;
    }

    postFile(body: any): Observable<any> {
        return this.http.post(`${this.url}/processFile`, body, {...this.httpOptions});
    }

    getData(url: string, params?: any, noAuth: boolean = false): Observable<any> {
        const separator = this.getUrlSeparator(this.url, url);
        const httpOptions = !noAuth ? this.httpOptions : '';
        let resType = 'text';
        if (params && params.hasOwnProperty('responseType')) {
            resType = params.responseType;
            params = '';
        }
        const opts = {
            ...httpOptions,
            params,
            responseType: resType as 'json',
        };
        return this.http.get(`${this.url}${separator}${url}`, opts);
    }

    public getUrlSeparator(leftPart: string, rightPart: string): string {
        return leftPart.slice(-1) === '/' || rightPart.slice(0, 1) === '/'
            ? ''
            : '/';
    }
}
