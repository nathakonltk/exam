import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { map, retry } from 'rxjs';
import { ProvAmpTamService,MemberService } from '../../_services/index';
import { MemberModel, TitleName,Province} from './../../_models/index';
import { Observable } from "rxjs"
@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent {
  @Input() titlename!:TitleName[];
  memberModel:MemberModel[]=[];
  public  province: Province[]=[];
  // displayedColumns: string[] = ['mem_id', 'first_name', 'nationality', 'tel'];
  displayedColumns: string[] = ['memId','fullname', 'nationality','address','tel','email'];
  constructor(
    private memberService:MemberService,
    public  provAmpTamService:ProvAmpTamService,
    public client: HttpClient,
    ){

  }
  titlename_arr:any;
  public ngOnInit() {
    
    //console.log("ProvName:",this.ProvName(2));
    this.province=this.provAmpTamService.getProvince();
    console.log('province',this.province);
    this.GetAll();
    console.log("titlename:",this.titlename);
    console.log("titlename:",this.titlename[1]);
    
    let t="";
    this.titlename.map((val) => {
      t+='"'+val.title_id +'":"'+val.title_name+'",'
    });
    t="{"+t.substring(0, t.length - 1)+"}";
    console.log("t:",t);
    this.titlename_arr=JSON.parse(t);
    console.log("titlename_arr11:",this.titlename_arr);
    console.log("titlename_arr11:",this.titlename_arr["01"]);
    this.titlename_arr=JSON.parse('[ { "t01": "นาย", "t02": "นาง" }]');
    
    console.log("titlename_arr:",this.titlename_arr);
    console.log("titlename_arr:",this.titlename_arr[0]["t02"]);
    this.titlename.forEach(function (value) {
      console.log(value);
  });
      // let Obj = Object.keys(this.titlename)[0] // Get the name of the country, e.g. USA
      // return { // Return the new object structure
      //   val[title_id] : val.title_name,
      // }
    //});
    //this.ProvName(1);
    // this.ProvName(2);
    // this.ProvName(3);
    // this.ProvName(4);
    //this.no_img=this.image?.noimgFile;
    
  }
  GetAll(){    
    this.memberService.GetAll().subscribe(res => {
      this.memberModel=res;
      console.log('memberModel',this.memberModel);
    })
  }
  // TitleName(title_id:string){    
  //   const  res  =this.titlename.filter(i => i.title_id===title_id).map(x=>x.title_name)
  //   console.log("TitleName",res);
  //   return res;
  //   console.log("TitleName");
  // }
  ProvName(id:number){
    let tt;
    this.provAmpTamService.getProvince()
    .subscribe((items:any)  => {
      items.pip
      console.log('prov',items);
    });
    console.log('prov',tt);
  }
}

