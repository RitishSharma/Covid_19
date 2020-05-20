import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class WorldCovidDataService {
    constructor(private readonly http: HttpClient) {}
    
    WorldCovidData(): Observable<any> {
        return this.http
            .get<any>('https://api.covid19api.com/summary')
            .pipe(
                tap(response => {
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
