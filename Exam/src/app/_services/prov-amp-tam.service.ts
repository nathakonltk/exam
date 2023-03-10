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
  getProvince(id?:number): any {
    let ret =this.http.get<Province[]>("https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json").pipe(map(res => {
      return ( id? res.find(i => i.id===id) : res);
      
    }))
    return ret;
  }
  getAmphure(province_id:number): Observable<Amphure[]> {
    
    return this.http.get<Amphure[]>("https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json").pipe(map(res => {
      let ret =res.filter(i => i.province_id==province_id);
      return ret;
    }))
  }
  getTambon(amphure_id:number): Observable<Tambon[]> {
    return this.http.get<Tambon[]>("https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json").pipe(map(res => {
      let ret =res.filter(i => i.amphure_id==amphure_id);
      return ret;
    }))
  }
  getZipCode(SUB_DISTRICT_CODE:string): Observable<ZipCode[]> {
    return this.http.get<ZipCode[]>("https://raw.githubusercontent.com/Cerberus/Thailand-Address/master/zipcodes.json").pipe(map(res => {
      let ret =res.filter(i => i.SUB_DISTRICT_CODE==SUB_DISTRICT_CODE);
      return ret;
    }))
  }
 
}

