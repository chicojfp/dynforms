import { GenericSourceService } from './../../GenericSource.service';
import { HttpClient } from '@angular/common/http';
import { CountryService } from './../../country.service';
import {
  ComponentFactoryResolver,
  Directive,
  Input,
  OnInit,
  ViewContainerRef,
  PlatformRef
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
import { InputComponent } from "../input/input.component";
import { ButtonComponent } from "../button/button.component";
import { SelectComponent } from "../select/select.component";
import { DateComponent } from "../date/date.component";
import { RadiobuttonComponent } from "../radiobutton/radiobutton.component";
import { CheckboxComponent } from "../checkbox/checkbox.component";

const componentMapper = {
  input: InputComponent,
  button: ButtonComponent,
  select: SelectComponent,
  date: DateComponent,
  radiobutton: RadiobuttonComponent,
  checkbox: CheckboxComponent
};
@Directive({
  selector: "[dynamicField]"
})
export class DynamicFieldDirective implements OnInit {
  @Input() field: FieldConfig;
  @Input() group: FormGroup;
  @Input() service: string;
  componentRef: any;
  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef,
    private app: PlatformRef,
    private service2: CountryService,
    private http: HttpClient
  ) {}
  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(
      componentMapper[this.field.type]
    );
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.field = this.field;
    this.componentRef.instance.group = this.group;

    // console.log(this.field.datasource || this.field.options);
    if (this.field.datasource) {
      if (this.field.datasource.name) {
        const injector = this.componentRef.injector;
        const country = injector.get(this.field.datasource.name);
        this.componentRef.instance.dataSource = country;
      } else if (this.field.options || this.field.datasource.source) {
        const g = this.createGenericDataSource(this.field.datasource.source, undefined);
        this.componentRef.instance.dataSource = g;
      }
    }

    if (this.field.options) {
      const g = this.createGenericDataSource(undefined, this.field.options);
      this.componentRef.instance.dataSource = g;
    }

    console.log(this.componentRef.instance.dataSource);
  }

  private createGenericDataSource(url: string, itens: any[]): GenericSourceService {
    const g = new GenericSourceService(this.http);
    g.url = url;
    g.itens = itens;
    return g;
  }
}
