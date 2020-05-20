import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CovidDistrictDataService {
    constructor(private readonly http: HttpClient) {}
    
    getDistrictData(): Observable<any> {
        return this.http
            .get<any>('https://api.covid19india.org/v2/state_district_wise.json')
            .pipe(
                map(response => {
                   return response;
                }),
                catchError(error =>
                    this.handleError(error)
                )
            );
    }

    private handleError(error: Response) {
        return throwError(error);
    }
}
