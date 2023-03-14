import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map ,Observable} from 'rxjs';
import { MemberJoin, MemberModel } from '../_models/index';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(
    private http: HttpClient,
  ) { }
  GetAll():  Observable<MemberJoin[]>{
    return this.http.get<MemberJoin[]>(`${environment.apiUrl}/Member/GetAll`).pipe(map((res: any) => {
      return res;
    }));
  }
  Insert(data: any) {
    return this.http.post(`${environment.apiUrl}/Member/Insert`, data).pipe(map(res => {
      return res
    }))
  }
  Delete(id: string) {
    console.log(`${environment.apiUrl}/Member/Delete/`+id);
    return this.http.delete(`${environment.apiUrl}/Member/Delete/`+id).pipe(map(res => {
      return res
    }))
  }
}
