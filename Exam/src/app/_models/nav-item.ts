export interface NavItem {
  menu_code?: string;
  menu_ref_code?: string;
  menu_icon?: string;
  menu_level?: string;
  menu_name_th?: string;
  menu_name_en?: string;
  menu_position?: string;
  menu_route?: string;
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  children?: NavItem[];
}
