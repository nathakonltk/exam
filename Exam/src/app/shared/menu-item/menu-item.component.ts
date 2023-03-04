//import { BreadcrumbComponent } from './../breadcrumb/breadcrumb.component';
import { Component, Input, HostBinding, Output, EventEmitter } from '@angular/core';
import { NavItem } from 'src/app/_models/index';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent {
  expanded: boolean = false;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item!: NavItem;
  @Input() depth!: number;
  @Output() breadcrumdChange = new EventEmitter<string>();
  constructor(
    public router: Router

  ) { 
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit(): void {
  }
  
  onItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
      this.breadcrumdChange.emit(item.displayName);
      //console.log(item.children);
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
    
    console.log(item);
  }
  
}
