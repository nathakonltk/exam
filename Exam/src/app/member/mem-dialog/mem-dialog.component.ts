import { TitleName,MemberModel,Tambon,Province,Amphure,ZipCode,UploadFile } from './../../_models/index';
import { Component, OnInit,Inject,Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup ,FormControl, Validators,FormArray} from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { ProvAmpTamService,UploadfileService,MemberService } from '../../_services/index';
// import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

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
  //image?:Images;
  //noimgFile=require("../../_images/no-img.jpg");
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
    // private dialog: MatDialog,
    // @Inject(MAT_DIALOG_DATA) public data: any,
    // public dialogRef: MatDialogRef<MemberKeyinComponent>,
  ){
    //this.DateNew = this.datePipe.transform(this.DateNew, 'yyyy-MM-dd');
    this.dateAdapter.setLocale('th-TH'); //dd/MM/yyyy
    this.form = this.fb.group({
      title_id: ['', [Validators.required]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      birth_date: ['', [Validators.required]],
      age: ['', [Validators.required]],
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
  ngOnInit(): void {
    this.form.markAllAsTouched();
    this.getProvince();
    this.GetAll();
  }
  GetAll(){    
    this.memberService.GetAll().subscribe(res => {
      console.log(res);
    })
  }
  CalAge(birth_date:Date){

    if(birth_date){
      const timeDiff = Math.abs(Date.now() - birth_date.getTime());
      this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
      //console.log("showAge:"+showAge);
    }

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
    .subscribe(res => {
      this.amphure=res
    });
  }
  getTambon(amphure_id:string): void {
    this.provAmpTamService.TumbGetAmpId(amphure_id)
    .subscribe(res => {
      this.tambon = res;
      // console.log('tambon',this.tambon);
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