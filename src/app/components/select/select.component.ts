import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
import { Observable } from "rxjs";
@Component({
  selector: "app-select",
  template: `
<mat-form-field class="select-field demo-full-width margin-top" [formGroup]="group">
  <mat-select [placeholder]="field.label" [formControlName]="field.name">
   <mat-option *ngFor="let item of (getValues() | async)" [value]="getId(item)">{{getDescription(item)}}</mat-option>
  </mat-select>
</mat-form-field>
`,
  styles: []
})
export class SelectComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  ds: any;

  set dataSource(ds: any) {
    // this.field.options = ds.getLista();
    this.ds = ds;
  }

  get dataSource() {
    return this.ds;
  }

  getValues(): Observable<any> {
    // console.log(this.ds);
    return this.ds.getList();
  }

  constructor() {}
  ngOnInit() {

  }

  getDescription(item: any): any {
    return item['name'] || item;
  }

  getId(item: any): any {
    return item['id'] || item;
  }
}
