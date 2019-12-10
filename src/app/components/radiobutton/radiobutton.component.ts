import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
import { GenericListComponent } from "../generic-list.component";
import { MatRadioGroup } from "@angular/material/radio";
@Component({
  selector: "app-radiobutton",
  template: `
<div class="radio-field  demo-full-width margin-top" [formGroup]="group">
  <label class="radio-label-padding">{{field.label}}:</label>
  <mat-radio-group [formControlName]="field.name">
  <br>
    <!-- mat-radio-button *ngFor="let item of field.options" [value]="item">{{item}}</mat-radio-button -->
    <mat-radio-button *ngFor="let item of (getList() | async)" [value]="getId(item)">{{getDescription(item)}}
    </mat-radio-button>
  </mat-radio-group>
</div>
`,
  styles: []
})
export class RadiobuttonComponent extends GenericListComponent implements OnInit {
  @ViewChild(MatRadioGroup, { static: true }) fGroup: MatRadioGroup;

  field: FieldConfig;
  group: FormGroup;
  constructor() {
    super();
  }
  ngOnInit() {}

  // public setValue(value) {
  //   console.log(" adicionando radio button ");
  //   this.fGroup.value = value;
  // }
}
