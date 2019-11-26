import { FieldConfig } from './field.interface';
import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FieldParserService {

  constructor() { }

  public parseFields(fields: FieldConfig[]) {

    if (!fields) return undefined;

    fields.forEach(f => {
      if (!f.type) f.type = 'input';
      if (!f.inputType) f.inputType = 'text';
      if (!f.label) f.label = f.name;

      f.validations = (f.validations || []);
      if (f.req) {
        f.validations.push({name: "required", validator: Validators.required, message: "Campo obrigatório"});
      }
      f.validations.forEach(v => {
        if (v.padrao) {
          v.name = "pattern";
          v.validator = Validators.pattern(v.padrao);
        }
      });
    });

    // console.log(fields);

    return fields;

  }
}
