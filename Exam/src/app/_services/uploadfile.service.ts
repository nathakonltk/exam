import { Injectable } from '@angular/core';
import { UploadFile } from  './../_models/index';
import { v4 as uuidv4 } from 'uuid';

@Injectable({  providedIn: 'root'})
export class UploadfileService {

  constructor() { }

  single(file: File): Promise<UploadFile> {
    
    return new Promise<UploadFile>((resolve, reject) => {
      var reader = new FileReader();
      reader.onload = (item: any) => {

        // get extension of file
        let ext = file.name.split('.').pop();

        let newFile = new UploadFile();
        newFile.name = uuidv4() + "." + ext;
        newFile.name_raw = file.name;
        newFile.size = file.size;
        newFile.type = file.type;
        newFile.file = item.target.result;
        newFile.ext = ext ? ext : '';
        newFile.path = "";

        resolve(newFile);
      }

      reader.readAsDataURL(file);
    })
  }
  async multiple(files: File[]): Promise<UploadFile[]> {

    let uploadedFile: UploadFile[] = [];
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        let newfile = await this.single(files[i]);
        uploadedFile.push(newfile);
      }
    }

    return uploadedFile;
  }

  async url(imageUrl: string): Promise<UploadFile> {

    var res = await fetch(imageUrl);
    var blob = await res.blob();

    return new Promise<UploadFile>((resolve, reject) => {
      var reader = new FileReader();
      reader.onload = (item: any) => {

        let tempFileId = uuidv4();
        let tempFileExt = "jpg";
        let tempFileName = "";

        switch (blob.type)
        {
          case "image/jpeg":
            tempFileExt = "jpeg";
            tempFileName = tempFileId + "." + tempFileExt;
            break;
          case "image/png":
            tempFileExt = "png";
            tempFileName = tempFileId + "." + tempFileExt;
            break;
        }

        let newFile = new UploadFile();
        newFile.name = tempFileName;
        newFile.name_raw = tempFileName;
        newFile.size = blob.size;
        newFile.type = blob.type;
        newFile.file = item.target.result;
        newFile.ext = tempFileExt;
        newFile.path = "";

        resolve(newFile);
      }

      reader.readAsDataURL(blob);
    })
  }
}
