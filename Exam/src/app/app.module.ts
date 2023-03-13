import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.component';
import { MenuComponent } from './shared/menu/menu.component';
import { MenuItemComponent } from './shared/menu-item/menu-item.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { HeaderComponent } from './shared/header/header.component';
import { MemDialogComponent } from './member/mem-dialog/mem-dialog.component';
import { MemberListComponent } from './member/member-list/member-list.component';
import { NgxScrollTopModule } from 'ngx-scrolltop';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    MenuComponent,
    MenuItemComponent,
    BreadcrumbComponent,
    HeaderComponent,
    MemDialogComponent,
    MemberListComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    NgxScrollTopModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
