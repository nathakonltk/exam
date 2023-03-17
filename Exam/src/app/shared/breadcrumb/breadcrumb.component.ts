import { Component } from '@angular/core';
import { Router,NavigationEnd,NavigationStart,Event as NavigationEvent,ActivatedRoute  } from '@angular/router';
import { NavItem } from '../../_models/index';
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent  {
  NavItem = new NavItem;
  navitem:any;
  //@Input() breadcrumb!:string;
  breadcrumb="";
  
  event$ 
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    // private avItem:NavItem,
    ) {
    let url="";
    //let nav=this.NavItem.navItems;
    this.event$
       =this.router.events
          .subscribe(
            (event: NavigationEvent) => {
                
              if(event instanceof NavigationStart) {
                url=event.url;
                //console.log("BreadcrumbComponent::",url);
                //this.ChangeBreadcrumb(url);
                let res= this.NavItem.navItems.filter(i => i.route==url);
                //console.log("BreadcrumbComponent: res :",res[0].displayName);
                this.breadcrumb=res[0].displayName;
              }
            });
    
  }
  
  
}
