import { Observable } from 'rxjs';
import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
@Component({
  selector: "app-radiobutton",
  template: `
<div class="demo-full-width margin-top" [formGroup]="group">
<label class="radio-label-padding">{{field.label}}:</label>
<mat-radio-group [formControlName]="field.name">
<br>
<mat-radio-button *ngFor="let item of (getValues() | async)" [value]="getId(item)"  class="spaced-item">{{getDescription(item)}}</mat-radio-button>
</mat-radio-group>
</div>
`,
  styles: []
})
export class RadiobuttonComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  ds: any;

  constructor() {}
  ngOnInit() {}


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

  getDescription(item: any): any {
    return item['name'] || item;
  }

  getId(item: any): any {
    return item['id'] || item;
  }

}
