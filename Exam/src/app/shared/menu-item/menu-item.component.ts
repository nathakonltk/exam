//import { BreadcrumbComponent } from './../breadcrumb/breadcrumb.component';
import { Component, Input, HostBinding, Output, EventEmitter } from '@angular/core';
//import { NavItem } from 'src/app/_models/index';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent {
  expanded: boolean = false;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: any;
  constructor(
    public router: Router

  ) { 
  }

  ngOnInit(): void {
  }
  
  onItemSelected(item: any) {
    if (item.route ) {
      this.router.navigate([item.route]);
    }
   
    
    console.log(item);
  }
  
}
