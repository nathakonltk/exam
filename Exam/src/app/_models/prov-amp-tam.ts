
export interface Province {
  provId: string;
  provName: string;
  regId: string;
  divId: string;
  provNameEng: string;
}
export interface Amphure {
  provId: string;
  ampId: string;
  ampName: string;
}
export interface Tambon {
  ampId: string;
  tumId: string;
  tumName: string;
}
export interface ZipCode {
  tumId: string;
  orderNo: number;
  zipCode: string;
}