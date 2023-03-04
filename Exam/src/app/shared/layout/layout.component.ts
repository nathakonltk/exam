import { Component, Output, ViewChild, EventEmitter, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
//import { MediaMatcher } from '@angular/cdk/layout';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  breadcrumbs="";
  breadcrumdLayoutChange(val:string){  
    this.breadcrumbs=val;  
    //console.log("val:",val);
  }
  @ViewChild('main_menu') sidenav!: MatSidenav;
  toggleSideNav() {
    this.sidenav.toggle();
  }

}
