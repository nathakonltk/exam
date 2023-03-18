import { Component, EventEmitter, Output,OnInit } from '@angular/core';
import { NavItem } from '../../_models';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  NavItem = new NavItem;
  navitem:any;
  ngOnInit(): void {
    this.navitem = this.NavItem.navItems;
    console.log("this.navitem:",this.navitem);
    
  }
  
}
