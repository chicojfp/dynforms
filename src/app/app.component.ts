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
      name: "name", label: "Nome Completo", "req": true
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
    // ,
    // {
    //   type: "input",
    //   label: "Sobrenome",
    //   inputType: "text",
    //   name: "name",
    //   validations: [
    //     {
    //       name: "required",
    //       validator: Validators.required,
    //       message: "Name Required"
    //     },
    //     {
    //       name: "pattern",
    //       validator: Validators.pattern("^[a-zA-Z]+$"),
    //       message: "Accept only text"
    //     }
    //   ]
    // },
    // {
    //   type: "input",
    //   label: "Email Address",
    //   inputType: "email",
    //   name: "email",
    //   validations: [
    //     {
    //       name: "required",
    //       validator: Validators.required,
    //       message: "Email Required"
    //     },
    //     {
    //       name: "pattern",
    //       validator: Validators.pattern(
    //         "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
    //       ),
    //       message: "Invalid email"
    //     }
    //   ]
    // },
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
      name: "CPF",
      validations: [
            {
              name: "required",
              padrao: "^[0-9]{11}$",
              message: "Informe um CPF válido."
            }
      ]
    },
    {
      type: "radiobutton",
      label: "Sexo",
      name: "sexo",
      options: ["Masculino", "Feminino"]
      // datasource: {
      //   name: "CountryService",
      //   filters: [
      //     {key:"", value: ""}
      //   ]
      // }
    },
    {
      type: "date",
      label: "Data de Nascimento",
      name: "dob",
      req: true
    },
    {
      type: "select",
      label: "Selecione seu País",
      name: "country",
      req: true,
      datasource: {
        source: "http://localhost:4200/assets/paises.json"
      }
    },
    {
      type: "select",
      label: "Selecione seu Estado",
      name: "state",
      req: true,
      datasource: {
        source: "http://localhost:4200/assets/estados.json"
      }
    },
    {
      type: "checkbox",
      label: "Accept Terms",
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
    // console.log(this.regConfig);
  }

  ngOnInit() {
    this.recuperarDados();
  }
}
