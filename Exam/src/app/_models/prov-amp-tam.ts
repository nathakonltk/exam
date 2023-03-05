export interface Tambon {
  id: number;
  zip_code: number;
  name_th: string;
  name_en: string;
  amphure_id: number;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
}
export interface Province {
  id: number;
  name_th: string;
  name_en: string;
  geography_id: number;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
}
export interface Amphure {
  id: number;
  name_th: string;
  name_en: string;
  province_id: number;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
}
export interface ZipCode {
  ZIPCODE_ID: number;
  SUB_DISTRICT_CODE: string;
  PROVINCE_ID: string;
  DISTRICT_ID: string;
  SUB_DISTRICT_ID: string;
  ZIPCODE: string;
}