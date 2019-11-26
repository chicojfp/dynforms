export interface Validator {
  name?: string;
  padrao?: any;
  validator?: any;
  message: string;
}

export interface FilterConfig {
  key: string;
  value: string;
}

export interface DataSourceConfig {
  name?: string;
  source?: string;
  filters?: FilterConfig[];
}

export interface FieldConfig {
  label?: string;
  name: string;
  req?: any;
  inputType?: string;
  options?: string[];
  collections?: any;
  type?: string;
  value?: any;
  validations?: Validator[];
  datasource?: DataSourceConfig;
}
