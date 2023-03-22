import { NgModule } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
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
import { LoadingDialogComponent } from './shared/loading-dialog/loading-dialog.component';
// import { IConfig,provideNgxMask,NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask } from 'ngx-mask'
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ResumeComponent } from './owner/resume/resume.component';
// const maskConfigFunction: () => Partial<IConfig> = () => {
//   return {
//     validation: false,
//     dropSpecialCharacters: false,
//     thousandSeparator: ","
//   };
// };

// bootstrapApplication(AppComponent, {
//   providers:[provideEnvironmentNgxMask(maskConfigFunction)]
// }).catch((err) => console.error(err));
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
    LoadingDialogComponent,
    ResumeComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    NgxScrollTopModule, 
    NgxMaskDirective, NgxMaskPipe
  ],
  providers: [provideNgxMask()],
  bootstrap: [AppComponent]
})
export class AppModule { }
