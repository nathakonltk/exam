import { HttpClient } from '@angular/common/http';
import { Component ,OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Exam';
  constructor(
    private http:HttpClient,
  ){

  }
  
  ngOnInit(){
    // this.http.get("https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json").subscribe(res=>{
    //   console.log('res',res);
    // });
    // console.log('resqq');
  }
}
