import { TitleName,MemberModel,MemberJoin,Tumbon,Province,Amphure,ZipCode,UploadFile } from './../../_models/index';
import { Component, OnInit,Inject,Output,ViewChild  } from '@angular/core';
import { FormBuilder, FormGroup ,FormControl, Validators,FormArray} from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { ProvAmpTumService,UploadfileService,MemberService } from '../../_services/index';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoadingDialogComponent } from '../../shared/loading-dialog/loading-dialog.component';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import {MemberListComponent} from '../member-list/member-list.component'


@Component({
  selector: 'app-mem-dialog',
  templateUrl: './mem-dialog.component.html',
  styleUrls: ['./mem-dialog.component.scss'],
  providers:[DatePipe]
})

export class MemDialogComponent { 
  @ViewChild(MemberListComponent, { static: false }) MemList! : MemberListComponent;
  DateNew = new Date(); 
  form: FormGroup;
  imgfile: FormArray;
  avatar: string = "";
  showAge=0;
  tumbon:Tumbon[]=[];
  amphure:Amphure[]=[];
  province:Province[]=[];
  zip_code:ZipCode[]=[];

  titlename=['นาย','นาง','นางสาว'];
  constructor(
    private dateAdapter: DateAdapter<Date>,
    private fb:FormBuilder,
    private provAmpTumService: ProvAmpTumService,
    private http:HttpClient,
    private uploadFileService:UploadfileService,
    private datePipe: DatePipe,
    private memberService:MemberService,
    private dialog: MatDialog,
    // @Inject(MAT_DIALOG_DATA) public data: any,
    // public dialogRef: MatDialogRef<MemDialogComponent>,
  ){
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
      tum_id: ['', [Validators.required]],
      amp_id: ['', [Validators.required]],
      prov_id: ['', [Validators.required]],
      zip_code:['', [Validators.required]],
      tel: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.email]],
      imgfile: this.fb.array([]),
      imgfile_old:[''],
      file:['']
    });
    this.imgfile = this.form.get('imgfile') as FormArray;
  }
  EditData(data:any){
    
    console.log("data:",data);
    this.form.reset();
    this.form.get('mem_id')?.setValue(data.memId);
    this.form.get('title_id')?.setValue(Number(data.titleId));
    this.form.get('first_name')?.setValue(data.firstName);
    this.form.get('last_name')?.setValue(data.lastName);
    this.form.get('birth_date')?.setValue(data.birthDate);
    this.form.get('nationality')?.setValue(data.nationality);
    this.form.get('address')?.setValue(data.address);
    // this.form.get('tum_id')?.setValue(data.tumId);
    // this.form.get('amp_id')?.setValue(data.ampId);
    this.form.get('prov_id')?.setValue(data.provId);
    this.ProvChange(data.provId,data.ampId);
    this.AmpChange(data.ampId,data.tumId);
    this.TumbonChange(data.tumId,data.zipCode);
    this.form.get('tel')?.setValue(data.tel);
    this.form.get('email')?.setValue(data.email);
    this.form.get('imgfile_old')?.setValue(data.imgfile);
    this.avatar=data.imgfile;
    let birthDate = new Date(data.birthDate);
    this.CalAge(birthDate);
    console.log("ff:",this.form.get('file')?.value);
  }
  save(data:any){
    console.log("imgfile:",data.imgfile.value.length);
    if (!this.form.valid){
      Swal.fire({
        title: 'กรุณากรอกข้อมูลในช่องสีแดง',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#7b1fa2',
        confirmButtonText: 'รับทราบ',
      }).then(()=> {
        Swal.close();
      })
        
      return;
    }
    let Imgfile="";
    if(data.imgfile.value.length>0){
      Imgfile=data.imgfile.value[0]['file'];
    }else{
      Imgfile=data.imgfile_old.value;
    }
    let MemId="";
    if(data.mem_id.value){
      MemId=data.mem_id.value;
    }else{
      MemId=data.mem_id.value;
    }
    //console.log("valueImgfile:",data.imgfile.value[0]['file']);
    console.log("Imgfile:",Imgfile);
    console.log("file:",data.file.value);
    
    let req = {
      MemId:data.mem_id.value,
      TitleId: String( data.title_id.value),
      FirstName: data.first_name.value,  
      LastName: data.last_name.value,      
      BirthDate: moment(data.birth_date.value).format('YYYY-MM-DD'),
      Nationality: data.nationality.value,

      Address: data.address.value,
      TumId: data.tum_id.value,
      AmpId: data.amp_id.value,
      ProvId: data.prov_id.value,
      ZipCode: data.zip_code.value,
      Tel: data.tel.value,
      Email: data.email.value,
      Imgfile: Imgfile,
      savedate:this.datePipe.transform(this.DateNew, 'yyyy-MM-dd')

    }
   // console.log("title_id:",req.BirthDate);
    console.log("req:",req);
   //return;
    Swal.fire({
      title: 'คุณยืนยันการบันทึกข้อมูล ' + this.titlename[data.title_id.value]+ req.FirstName + ' ' + req.FirstName + ' ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#7b1fa2',
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
              this.MemList.MemberGetAll();
              this.form.reset();
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
        dialogLoadingSave.close();
      }
    })
  }
  ngOnInit() {
    this.form.markAllAsTouched();
    this.getProvince();
    
  }
  
  
  CalAge(birth_date?:Date){

    if(!birth_date){
      birth_date = new Date();
    }
      const timeDiff = Math.abs(Date.now() - birth_date.getTime());
      this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
      console.log("showAge:"+this.showAge);

  }
  
  // onFileUpload(files:any){
  //   // this.selecetdFile = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //   this.imagePreview = reader.result;
  //   };
  //   reader.readAsDataURL(this.selecetdFile);
  // }
  // OnUploadFile(files:any,MemId:string) {
  //   //Upload file here send a Form data
  //   const uploadFormData = new FormData();
  //   uploadFormData.append(MemId, this.selectedFile, this.selectedFile.name);
  //   this.http.post('yourdomain.com/file-upload', uploadFormData)
  //   }
  
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
  ProvChange(province_id:string,val?:string){
    console.log(province_id);
    this.getAmphure(province_id);
    this.form.get('amp_id')?.reset();
    this.form.get('tum_id')?.reset();
    this.form.markAllAsTouched();
    if(val){      
      this.form.get('amp_id')?.setValue(val);
    }
  }
  AmpChange(amphure_id:string,val?:string){
    this.getTumbon(amphure_id);
    this.form.get('tum_id')?.setValue(val);
  }
  TumbonChange(TumId:string,val?:string){
    this.getZipCode(TumId);
    this.form.get('zip_code')?.setValue(val);
  }
  getProvince() {
    this.provAmpTumService.ProvGetAll()
    .subscribe((res: any) => {
      this.province= res;
    });
  }
  getAmphure(province_id:string): void {
    this.provAmpTumService.AmpGetProvId(province_id)
    .subscribe((res: any) => {
      this.amphure=res
    });
  }
  getTumbon(amphure_id:string): void {
    this.provAmpTumService.TumbGetAmpId(amphure_id)
    .subscribe((res: any) => {
      this.tumbon = res;
    });
  }
  getZipCode(TumId:string): void {
    this.provAmpTumService.ZipCodeGetTumId(TumId)
    .subscribe(res => {
      this.zip_code = res;
      // console.log('zip_code',this.zip_code);
    });
  }
}