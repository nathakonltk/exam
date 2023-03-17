import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpParams,HttpErrorResponse } from '@angular/common/http';
import { map, Observable,tap,catchError,of,throwError  } from 'rxjs';
import { Tumbon,Province,Amphure,ZipCode} from '../_models/index';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProvAmpTumService {

  constructor(
    private http: HttpClient,
  ) { 
  }
 
  // private handleError(error: HttpErrorResponse) {
  //   if (error.status === 0) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong.
  //     console.error(
  //       `Backend returned code ${error.status}, body was: `, error.error);
  //   }
  //   // Return an observable with a user-facing error message.
  //   return throwError(() => new Error('Something bad happened; please try again later.'));
  // }

  //public _provinces:Province[]=this.getProvince();
  
  ProvGetAll(): any {
    return this.http.get(`${environment.apiUrl}/PADZ/Prov/GetAll`);
  }
  ProvGetId(id:string): Observable<Province[]> {
    return this.http.get<Province[]>(`${environment.apiUrl}/PADZ/ProvGetId/`+id)
  }


  AmpGetProvId(ProvId:string): Observable<Amphure[]> {
    //console.log("AmpGetProvId:",`${environment.apiUrl}/PADZ/AmpGetProvId/`+ProvId);
    return this.http.get<Amphure[]>(`${environment.apiUrl}/PADZ/AmpGetProvId/`+ProvId);
  }
  AmpGetAmpId(AmpId:string): Observable<Amphure[]> {
    
    return this.http.get<Amphure[]>(`${environment.apiUrl}/PADZ/AmpGetAmpId/`+AmpId)
  }


  TumbGetAmpId(AmpId:string): Observable<Tumbon[]> {
    return this.http.get<Tumbon[]>(`${environment.apiUrl}/PADZ/TumbGetAmpId/`+AmpId)
  }
  TumbGetTumId(TumId:string): Observable<Tumbon[]> {
    return this.http.get<Tumbon[]>(`${environment.apiUrl}/PADZ/TumbGetTumId/`+TumId)
  }


  ZipCodeGetTumId(TumId:string): Observable<ZipCode[]> {
    return this.http.get<ZipCode[]>(`${environment.apiUrl}/PADZ/ZipCodeGetTumId/`+TumId)
  }
 
}

