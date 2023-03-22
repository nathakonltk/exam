import { NgModule,OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemDialogComponent } from './member/mem-dialog/mem-dialog.component';
import { ResumeComponent } from './owner/resume/resume.component';
const routes: Routes = [
  {
    path:'resume',
    data:{breadcrumb:'Resume'},
    component: ResumeComponent
    
  },
  {
    path:'member',
    data:{breadcrumb:'จัดการข้อมูลสมาชิก'},
    component: MemDialogComponent
    
  },
 
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
