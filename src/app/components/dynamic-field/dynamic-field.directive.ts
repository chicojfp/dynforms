import {
  ComponentFactoryResolver,
  Directive,
  Input,
  OnInit,
  ViewContainerRef,
  Inject
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../field.interface';
import { GenericDataSourceService } from 'src/app/generic-data-source.service';
import { HttpClient } from '@angular/common/http';


@Directive({
  selector: '[dynamicField]'
})
export class DynamicFieldDirective implements OnInit {
  @Input() field: FieldConfig;
  @Input() group: FormGroup;
  componentRef: any;
  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef,
    private http: HttpClient,
    @Inject('typeMapper') private componentMapper
  ) { }
  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(
      // this.injector.get().
      this.componentMapper[this.field.type]
    );
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.field = this.field;
    this.componentRef.instance.group = this.group;

    if (this.field.dataSource) {
      const ds = this.field.dataSource;
      if (ds.options || ds.source) {
        const g = new GenericDataSourceService(this.http);
        if (ds.options) {
          g.items = ds.options;
        }
        g.url = ds.source;
        this.componentRef.instance.ds = g;
      }
    }
  }
}
