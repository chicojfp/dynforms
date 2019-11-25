import { Component, ViewChild, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { FieldConfig } from "./field.interface";
import { DynamicFormComponent } from "./components/dynamic-form/dynamic-form.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;

  regConfig: FieldConfig[] = [
    {
      // type: "input",
      // label: "Username",
      // inputType: "text",
      name: "name",
      label: "Informeu seu nome completo",
      req: true
      // validations: [
      //   {
      //     name: "required",
      //     validator: Validators.required,
      //     message: "Name Required"
      //   },
      //   {
      //     name: "pattern",
      //     validator: Validators.pattern("^[a-zA-Z]+$"),
      //     message: "Accept only text"
      //   }
      // ]
    },
    // {
    //   type: "input",
    //   label: "Email",
    //   inputType: "text",
    //   name: "name",
    //   validations: [
    //     {
    //       name: "pattern",
    //       validator: Validators.pattern("^[a-zA-Z]+$"),
    //       message: "Accept only text"
    //     }
    //   ]
    // },
    {
      type: "input",
      label: "Email Address",
      inputType: "email",
      name: "email",
      req: true,
      validations: [
        {
          name: "pattern",
          pattern: "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
          message: "Email inválido."
        }
      ]
    },
    // {
    //   type: "input",
    //   label: "Password",
    //   inputType: "password",
    //   name: "password",
    //   validations: [
    //     {
    //       name: "required",
    //       validator: Validators.required,
    //       message: "Password Required"
    //     }
    //   ]
    // },
    {
      type: "radiobutton",
      label: "Gender",
      name: "gender",
      dataSource: {
        options: ["Male", "Female"],
      },
      value: "Male"
    },
    {
      type: "date",
      label: "DOB",
      name: "dob",
      req: true
    },
    {
      type: "select",
      // label: "Country",
      name: "country",
      // value: "UK",
      dataSource: {
        options: ["India", "UAE", "UK", "US"]
      }
    },
    {
      type: "checkbox",
      label: "Aceito os termos",
      name: "term",
      value: true
    },
    {
      type: "button",
      label: "Save",
      name:"Save"
    }
  ];

  config = '';

  submit(value: any) {}

  public recuperarDados() {
    this.config = JSON.stringify(this.regConfig, null, '    ');
  }

  public updateForm() {
    this.regConfig = JSON.parse(this.config);
    console.log(this.regConfig);
  }

  ngOnInit() {
    this.recuperarDados();
  }
}
