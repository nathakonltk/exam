import { NgModule,OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemDialogComponent } from './member/mem-dialog/mem-dialog.component';
const routes: Routes = [
  {
    path:'member',
    data:{breadcrumb:'จัดการข้อมูลสมาชิก'},
    component: MemDialogComponent,
    
  },
  {
    path:'membertt',
    data:{breadcrumb:'จัดการข้อมูลสมาชิก'},
    component: MemDialogComponent,
    
  }
  // {
  //   path: '**',
  //   redirectTo: '/notfound'
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
