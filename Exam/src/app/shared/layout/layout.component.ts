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
 
  breadcrumb="";
  // event$ 
 
  // constructor(private router: Router) {
    
  //   this.event$
  //     =this.router.events
  //         .subscribe(
  //           (event: NavigationEvent) => {
  //             if(event instanceof NavigationStart) {
  //               console.log(event);
  //             }
  //           });
  // }
  breadcrumdLayoutChange(val:string){  
    this.breadcrumb=val;  
    //console.log("val:",val);
  }
  @ViewChild('main_menu') sidenav!: MatSidenav;
  toggleSideNav() {
    this.sidenav.toggle();
  }

  ngOnInit(): void {//_futureSnapshot
    //this.router.config.forEach(i =>console.log(i.data))
    
    //onsole.log("snapshot",this.router.events);
    // this.breadcrumbs = this.route['_routerState'];
    //const s = this.activatedRoute.paramMap;
    //console.log("sss",s);
    //this.route.snapshot.paramMap.get('memId');
    
  }

}
