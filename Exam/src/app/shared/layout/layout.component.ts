import { Component, Output, ViewChild, EventEmitter, Input,OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router,NavigationEnd,NavigationStart,Event as NavigationEvent  } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { map,filter } from 'rxjs';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
 
 
  @ViewChild('main_menu') sidenav!: MatSidenav;
  toggleSideNav() {
    this.sidenav.toggle();
  }

}
