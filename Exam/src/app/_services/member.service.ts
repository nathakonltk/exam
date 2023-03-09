import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map ,Observable} from 'rxjs';
import { MemberModel } from '../_models/index';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(
    private http: HttpClient,
  ) { }
  GetAll():  Observable<MemberModel[]>{
    return this.http.get<MemberModel[]>(`${environment.apiUrl}/Member/GetAll`)
  }
}
