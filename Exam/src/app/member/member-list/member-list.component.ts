import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { map, retry } from 'rxjs';
import { ProvAmpTamService,MemberService } from '../../_services/index';
import { MemberJoin, TitleName,Province} from './../../_models/index';
import { Observable } from "rxjs"
@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent {
  @Input() titlename!:any;
  memberModel:MemberJoin[]=[];
  public  province: Province[]=[];
  // displayedColumns: string[] = ['mem_id', 'first_name', 'nationality', 'tel'];
  displayedColumns: string[] = ['memId','fullname', 'nationality','address','tel','email','edit','delete'];
  constructor(
    private memberService:MemberService,
    private  provAmpTamService:ProvAmpTamService
    ){

  }
  titlename_arr:any;
  ngOnInit() {    
    this.MemberGetAll();
  }
  DeleteRow(MemId:string){
    let res=this.memberService.Delete(MemId);
    this.MemberGetAll();
    console.log(MemId);
    console.log("res:",res);
  }
  EditRow(MemId:string){
    console.log(MemId);
  }
  MemberGetAll(){    
    this.memberService.GetAll().subscribe(res => {
      this.memberModel=res;
      console.log('memberModel',this.memberModel);
    })
  }
}

