export interface Validator {
  name: string;
  validator?: any;
  pattern?: string;
  message: string;
}
export interface DataSourceConfig {
  source?: string;
  options?: string[];
  name?: string;
}
export interface FieldConfig {
  label?: string;
  name: string;
  req?: any;
  inputType?: string;
  collections?: any;
  type?: string;
  value?: any;
  validations?: Validator[];
  dataSource?: DataSourceConfig;
}
