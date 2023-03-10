import { Component, Input } from '@angular/core';
import { map } from 'rxjs';
import { ProvAmpTamService,MemberService } from '../../_services/index';
import { MemberModel, TitleName,Province} from './../../_models/index';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent {
  @Input() titlename!:TitleName[];
  memberModel:MemberModel[]=[];
  province:Province[]=[];
  // displayedColumns: string[] = ['mem_id', 'first_name', 'nationality', 'tel'];
  displayedColumns: string[] = ['memId','fullname', 'nationality','address','tel','email'];
  constructor(
    private memberService:MemberService,
    private provAmpTamService:ProvAmpTamService,
    ){

  }
  ngOnInit(): void {
    //console.log("ProvName:",this.ProvName(2));
    //this.province=this.provAmpTamService._provinces;
    // console.log('province',this.province);
    this.GetAll();
    this.ProvName(1);
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
  TitleName(title_id:string){    
    const  res  =this.titlename.filter(i => i.title_id===title_id).map(x=>x.title_name)
    //console.log("TitleName",res);
    return res;
  }
  ProvName(id:number){
    // const  res  =this.province.filter(i => i.id===id).map(x=>x.name_th)
    // console.log('res',res);
    console.log('res:',id);
    //return "res";
    this.provAmpTamService.getProvince(id)
    .subscribe((res: any) => {
      //this.province=res;
      console.log('province',res);
      //return res;
    });
    //console.log('prov',prov);
  }
}

