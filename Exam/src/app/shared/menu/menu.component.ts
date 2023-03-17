import { Component, EventEmitter, Output,OnInit } from '@angular/core';
import { NavItem } from '../../_models';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  //@Output() breadcrumbMenuEvent=new EventEmitter<string>();
  NavItem = new NavItem;
  navitem:any;
  ngOnInit(): void {
    this.navitem = this.NavItem.navItems;
    console.log("this.navitem:",this.navitem);
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
  // navItems: NavItem[] = [

  //   {
  //     displayName: 'หน้าหลัก',
  //     disabled: true,
  //     iconName: 'home',
  //     route: '/admin',
  //     children: [
        
  //     ]
  //   },
  //   {
  //     displayName: 'จัดการข้อมูลสมาชิก',
  //     disabled: true,
  //     iconName: 'perm_identity',
  //     route: '/member',
  //     children: [
        
  //     ]
  //   },
    
  // ];
  // breadcrumdMenuChange(val:string){
  //   this.breadcrumbMenuEvent.emit(val);
  //   //console.log("breadcrumdMenuChange");
  // }
}
