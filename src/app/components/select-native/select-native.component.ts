import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
import { GenericDataSourceService } from "src/app/generic-data-source.service";
import { Observable } from "rxjs";
import { GenericListComponent } from "../generic-list.component";
@Component({
  selector: "app-select-native",
  templateUrl: "./select-native.component.html",
  styles: []
})
export class SelectNativeComponent extends GenericListComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;

  constructor() {
    super();
  }
  ngOnInit() {}


}
