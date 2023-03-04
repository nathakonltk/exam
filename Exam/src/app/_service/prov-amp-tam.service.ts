import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProvAmpTamService {

  constructor(
    private http: HttpClient,
  ) { }
  // getTambon(){
  //   return this.http.get<any[]>("https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json").pipe(map((res: any) => {
  //     return res;
  //   }));
  // }

  getTambon() {
    return this.http.get(`https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json`).pipe(map(res => {
      return res
    }))
  }
}
