import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map ,Observable} from 'rxjs';
import { MemberJoin } from '../_models/index';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(
    private http: HttpClient,
  ) { }
  GetAll():  Observable<MemberJoin[]>{
    return this.http.get<MemberJoin[]>(`${environment.apiUrl}/Member/GetAll`)
  }
  Delete(id: string) {
    console.log(`${environment.apiUrl}/Member/Delete/`+id);
    return this.http.delete(`${environment.apiUrl}/Member/Delete/`+id).subscribe(() => console.log("user deleted")); 
  }
}
