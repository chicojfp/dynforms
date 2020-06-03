import { tap, filter, map } from 'rxjs/operators';
import { FieldParserService } from './../../field-parser.service';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { FieldConfig, Validator } from '../../field.interface';

@Component({
  exportAs: 'dynamicForm',
  selector: 'dynamic-form',
  template: `
    <form class='dynamic-form' [formGroup]='form' (submit)='onSubmit($event)'>
      <ng-container
        class='dyn-flex-item '
        *ngFor='let field of fields'
        dynamicField
        [field]='field'
        [group]='form'
      >
        <br />
      </ng-container>
    </form>
  `,
  styles: [],
})
export class DynamicFormComponent implements OnInit, OnChanges {
  @Input() fields: FieldConfig[] = [];
  @Input() set value(value) {
    this.fillValues(value);
  }
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  form: FormGroup;

  get value() {
    return this.form ? this.form.value : '';
  }

  constructor(
    private fb: FormBuilder,
    private fieldService: FieldParserService
  ) {}

  fillValues(value: any) {
    Object.getOwnPropertyNames(value).forEach((pName) => {
      const property = this.form.controls[pName];
      if (property) {
        property.setValue(value[pName]);
      }

      // console.log(pName + '   ' + value[pName]);
    });
  }

  ngOnInit() {
    this.form = this.createControl();
  }

  ngOnChanges() {
    this.fields = this.fieldService.parseFields(this.fields);
    this.form = this.createControl();
    this.form.valueChanges
      .pipe(filter((v) => this.form.valid))
      .subscribe((val) => {
        // console.log(val);
      });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form.valid) {
      console.log('Form válido');
      this.submit.emit(this.form.value);
    } else {
      console.log('Form INVALIDO');
      this.validateAllFormFields(this.form);
    }
  }

  createControl() {
    const group = this.fb.group({});
    this.fields.forEach((field) => {
      if (field.type === 'button') return;
      const control: FormControl = this.fb.control(
        field.value,
        this.bindValidations(field.validations || [])
      );
      this.addValueChangeListener(control);
      group.addControl(field.name, control);
    });
    return group;
  }

  addValueChangeListener(control: FormControl) {
    control.valueChanges
      .pipe(
        filter((c) => {
          console.log(c.invalid);
          return !c.invalid;
        }),
        map((c) => {
          return { ccc: c, name: 'chicojfp', valid: control.valid };
        })
      )
      .subscribe((val) => {
        if (val.valid) {
          console.log(val);
        }
      });
  }

  bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList = [];
      validations.forEach((valid) => {
        validList.push(valid.validator);
      });
      return Validators.compose(validList);
    }
    return null;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }
}
