import { TitleName,MemberModel,Tambon,Province,Amphure,ZipCode,UploadFile } from './../../_models/index';
import { Component, OnInit,Inject,Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup ,FormControl, Validators,FormArray} from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { ProvAmpTamService,UploadfileService,MemberService } from '../../_services/index';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoadingDialogComponent } from '../../shared/loading-dialog/loading-dialog.component';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-mem-dialog',
  templateUrl: './mem-dialog.component.html',
  styleUrls: ['./mem-dialog.component.scss'],
  providers:[DatePipe]
})

export class MemDialogComponent { 
  //@Output() dateInput(): EventEmitter;
  DateNew = new Date(); 
  form: FormGroup;
  imgfile: FormArray;
  avatar: string = "";
  showAge=0;
  tambon:Tambon[]=[];
  amphure:Amphure[]=[];
  province:Province[]=[];
  zip_code:ZipCode[]=[];

  titlename=['นาย','นาง','นางสาว'];
  constructor(
    private dateAdapter: DateAdapter<Date>,
    private fb:FormBuilder,
    private provAmpTamService: ProvAmpTamService,
    private http:HttpClient,
    private uploadFileService:UploadfileService,
    private datePipe: DatePipe,
    private memberService:MemberService,
    private dialog: MatDialog,
    // @Inject(MAT_DIALOG_DATA) public data: any,
    // public dialogRef: MatDialogRef<MemDialogComponent>,
  ){
    //this.DateNew = this.datePipe.transform(this.DateNew, 'yyyy-MM-dd');
    this.dateAdapter.setLocale('th-TH'); //dd/MM/yyyy
    this.form = this.fb.group({
      mem_id: [''],
      title_id: ['', [Validators.required]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      birth_date: ['', [Validators.required]],
      age: ['0'],
      nationality:['', [Validators.required]],

      address: ['', [Validators.required]],
      tam_id: ['', [Validators.required]],
      amp_id: ['', [Validators.required]],
      prov_id: ['', [Validators.required]],
      zip_code:['', [Validators.required]],
      tel: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.email]],
      imgfile: this.fb.array([]),
    });
    this.imgfile = this.form.get('imgfile') as FormArray;
  }
  save(data:any){
    

    let req = {
      mem_id:data.mem_id,
      title_id: data.title_id,
      last_name: data.last_name,      
      birth_date: data.birth_date,
      nationality: data.nationality,

      address: data.address,
      tam_id: data.tam_id,
      amp_id: data.amp_id,
      prov_id: data.prov_id,
      zip_code: data.zip_code,
      tel: data.tel,
      email: data.email,
      imgfile: data.imgfile

    }
    console.log(req);
    if (!this.form.valid){
      Swal.fire({
        title: 'กรุณากรอกข้อมูลในช่องสีแดง',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#4e88be',
        confirmButtonText: 'รับทราบ',
      }).then(()=> {
        Swal.close();
      })
        
      return;
    }
    Swal.fire({
      title: 'คุณยืนยันการบันทึกข้อมูล ' + this.titlename[data.title_id]+ data.first_name + ' ' + data.last_name + ' ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#4e88be',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.value) {

        let dialogLoadingSave = this.dialog.open(LoadingDialogComponent, {
          disableClose: true,
          data: {
            title: "กำลังบันทึกข้อมูล กรุณารอ....."
          }
        });
        this.memberService.Insert(req).subscribe((res: any) => {
          if (res && res.status == true) {
            Swal.fire({
              icon: 'success',
              title: 'บันทึกข้อมูลสำเร็จ',
              showConfirmButton: false,
              allowOutsideClick: false,
              timer: 3000
            }).then(() => {
              Swal.close();
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'ข้อมูลผิดพลาด',
              text: res.message,
              confirmButtonText: 'ปิดหน้าจอ',
            })
          }
        })
      }
    })
  }
  ngOnInit() {
    this.form.markAllAsTouched();
    this.getProvince();
    this.GetAll();
  }
  GetAll(){    
    this.memberService.GetAll().subscribe(res => {
      console.log(res);
    })
  }
  CalAge(birth_date?:Date){

    if(!birth_date){
      birth_date = new Date();
    }
      const timeDiff = Math.abs(Date.now() - birth_date.getTime());
      this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
      console.log("showAge:"+this.showAge);

  }
  
  
  createFile(item: UploadFile): FormGroup {
    return this.fb.group({
      id: [''],
      name: [item.name],
      name_raw: [item.name_raw],
      size: [item.size],
      type: [item.type],
      file: [item.file],
      ext: [item.ext],
      path: [item.path],
      desc: [item.desc]
    });
  }
  async uploadImage(event: any) {
    let uploaded = await this.uploadFileService.multiple(event.target.files);
    uploaded.forEach((item: UploadFile) => {
      this.imgfile.push(this.createFile(item));
      this.avatar = item.file;
    })
  }
  ProvChange(province_id:string){
    //console.log(province_id);
    this.getAmphure(province_id);
  }
  AmpChange(amphure_id:string){
    //console.log(555);
    //console.log(amphure_id);
    this.getTambon(amphure_id);
  }
  TambonChange(TumId:string){
    this.getZipCode(TumId);
  }
  getProvince() {
    this.provAmpTamService.ProvGetAll()
    .subscribe((res: any) => {
      this.province= res;
    });
  }
  getAmphure(province_id:string): void {
    this.provAmpTamService.AmpGetProvId(province_id)
    .subscribe((res: any) => {
      this.amphure=res
    });
  }
  getTambon(amphure_id:string): void {
    this.provAmpTamService.TumbGetAmpId(amphure_id)
    .subscribe((res: any) => {
      this.tambon = res;
      console.log('tambon',this.tambon);
    });
  }
  getZipCode(TumId:string): void {
    this.provAmpTamService.ZipCodeGetTumId(TumId)
    .subscribe(res => {
      this.zip_code = res;
      // console.log('zip_code',this.zip_code);
    });
  }
}