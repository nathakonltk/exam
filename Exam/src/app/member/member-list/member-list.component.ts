import { Component } from '@angular/core';
import { MemberService } from '../../_services/index';
import { MemberModel } from './../../_models/index';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent {
  memberModel:MemberModel[]=[];
  // displayedColumns: string[] = ['mem_id', 'first_name', 'nationality', 'tel'];
  displayedColumns: string[] = ['memId','firstName', 'nationality','tel'];
  constructor(
    private memberService:MemberService,
    ){

  }
  ngOnInit(): void {
    
    this.GetAll();
    //this.no_img=this.image?.noimgFile;
  }
  GetAll(){    
    this.memberService.GetAll().subscribe(res => {
      this.memberModel=res;
      console.log('memberModel',this.memberModel);
    })
  }
}

