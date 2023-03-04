import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  // navitem!:NavItem;product: Product | undefined;
  @Input() breadcrumb!:string;
  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.data.subscribe(d => {
      console.log(d['breadcrumb']); // ['home']
      this.breadcrumb=d['breadcrumb'];
    })
   }
  ngOnInit() {
    
  }
 

  
  
}
