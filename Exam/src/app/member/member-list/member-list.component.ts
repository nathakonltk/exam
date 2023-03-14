import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { map, retry } from 'rxjs';
import { ProvAmpTamService,MemberService } from '../../_services/index';
import { MemberJoin, TitleName,Province} from './../../_models/index';
import { Observable } from "rxjs"
import Swal from 'sweetalert2';
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
  ngOnInit() {    
    this.MemberGetAll();
  }
  DeleteRow(element:MemberJoin){
    Swal.fire({
      title: 'คุณต้องการลบข้อมูล '+this.titlename[element.titleId]+element.firstName + ' ' + element.lastName +' ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4e88be',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.value) {
        this.memberService.Delete(element.memId).subscribe((res: any) => {
          if (res.status === true) {
            Swal.fire({
              icon: 'success',
              title: res.message,
              showConfirmButton: false,
              timer: 1500
            }).then(res => {
              this.MemberGetAll();
            })
          }
        })
      }
    })
  }
  EditRow(MemId:string){
    console.log(MemId);
  }
  MemberGetAll(){    
    this.memberService.GetAll().subscribe((res: any) => {
      if (res != null && res.status == true) {
        this.memberModel=res.results;
        console.log('memberModel',this.memberModel);
      }
    })
  }
}

