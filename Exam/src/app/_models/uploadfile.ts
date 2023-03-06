export class UploadFile {
  id?: string;
  name?: string;
  name_raw!: string;
  size!: number;
  type!: string;
  file!: string;
  ext!: string;
  path!: string;
  desc?: string;
}