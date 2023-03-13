import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpParams,HttpErrorResponse } from '@angular/common/http';
import { map, Observable,tap,catchError,of,throwError  } from 'rxjs';
import { Tambon,Province,Amphure,ZipCode} from './../_models/index';


@Injectable({
  providedIn: 'root'
})
export class ProvAmpTamService {

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
  
  ProvGetAll(): Observable<Province[]> {
    return this.http.get<Province[]>("http://localhost:5084/PADZ/Prov/GetAll")
  }
  ProvGetId(id:string): Observable<Province[]> {
    return this.http.get<Province[]>("http://localhost:5084/PADZ/ProvGetId/"+id)
  }


  AmpGetProvId(ProvId:string): Observable<Amphure[]> {
    
    return this.http.get<Amphure[]>("http://localhost:5084/PADZ/AmpGetProvId/"+ProvId)
  }
  AmpGetAmpId(AmpId:string): Observable<Amphure[]> {
    
    return this.http.get<Amphure[]>("http://localhost:5084/PADZ/AmpGetAmpId/"+AmpId)
  }


  TumbGetAmpId(AmpId:string): Observable<Tambon[]> {
    return this.http.get<Tambon[]>("http://localhost:5084/PADZ/TumbGetAmpId/"+AmpId)
  }
  TumbGetTumId(TumId:string): Observable<Tambon[]> {
    return this.http.get<Tambon[]>("http://localhost:5084/PADZ/TumbGetTumId/"+TumId)
  }


  ZipCodeGetTumId(TumId:string): Observable<ZipCode[]> {
    return this.http.get<ZipCode[]>("http://localhost:5084/PADZ/ZipCodeGetTumId/"+TumId)
  }
 
}

