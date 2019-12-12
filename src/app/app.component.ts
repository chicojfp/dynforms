import { Location, PathLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Component, ViewChild, OnInit } from '@angular/core';
import { FieldConfig } from './field.interface';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(DynamicFormComponent, { static: true }) form: DynamicFormComponent;
  valuesString: string;
  config = '';
  urlAssets = '';

  constructor(private http: HttpClient, location: Location) {
    this.urlAssets =  location.prepareExternalUrl('assets');
  }

  regConfig: FieldConfig[] = [
    {
      // type: 'input',
      // label: 'Username',
      // inputType: 'text',
      name: 'name',
      label: 'Informeu seu nome completo',
      req: true
      // validations: [
      //   {
      //     name: 'required',
      //     validator: Validators.required,
      //     message: 'Name Required'
      //   },
      //   {
      //     name: 'pattern',
      //     validator: Validators.pattern('^[a-zA-Z]+$'),
      //     message: 'Accept only text'
      //   }
      // ]
    },
    // {
    //   type: 'input',
    //   label: 'Email',
    //   inputType: 'text',
    //   name: 'name',
    //   validations: [
    //     {
    //       name: 'pattern',
    //       validator: Validators.pattern('^[a-zA-Z]+$'),
    //       message: 'Accept only text'
    //     }
    //   ]
    // },
    {
      type: 'input',
      label: 'Email Address',
      inputType: 'email',
      name: 'email',
      req: true,
      validations: [
        {
          name: 'pattern',
          pattern: '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$',
          message: 'Email inválido.'
        }
      ]
    },
    // {
    //   type: 'input',
    //   label: 'Senha',
    //   inputType: 'password',
    //   name: 'senha',
    //   validations: [
    //     {
    //       name: 'required',
    //       validator: Validators.required,
    //       message: 'Senha Obrigatória.'
    //     }
    //   ]
    // },
    {
      type: 'radiobutton',
      label: 'Gênero',
      name: 'genero',
      dataSource: {
        options: ['Masculino', 'Feminino'],
      },
      value: 'Masculino'
    },
    {
      type: 'date',
      label: 'Data de Nascimento',
      name: 'dob',
      req: true
    },
    {
      name: 'logradouro',
      label: 'Logradouro',
      req: true
    },
    {
      name: 'numero',
      label: 'Número',
      req: true,
      validations: [
        {
          name: 'pattern',
          pattern: '^[0-9]+$',
          message: 'Número inválido.'
        }
      ]
    },
    {
      name: 'complemento',
      label: 'Complemento'
    },
    {
      type: 'select',
      label: 'Cidade',
      name: 'cidade',
      // value: 'UK',
      dataSource: {
        source: '/assets/cidades.json'
      }
    },
    {
      type: 'select',
      label: 'UF',
      name: 'uf',
      // value: 'UK',
      dataSource: {
        source: '/assets/estados.json'
      }
    },
    {
      type: 'select',
      label: 'País',
      name: 'pais',
      // value: 'UK',
      dataSource: {
        source: '/assets/paises.json'
      }
    },
    {
      type: 'checkbox',
      label: 'Aceito os termos',
      name: 'aceitarTermo',
      value: true
    },
    {
      type: 'button',
      label: 'save',
      name:'Salvar'
    }
  ];


  submit(value: any) {}

  public recuperarDados() {
    this.config = JSON.stringify(this.regConfig, null, '    ');
    this.valuesString = JSON.stringify(this.form.value, null, '    ');
  }

  public updateForm() {
    this.regConfig = JSON.parse(this.config);
    this.valuesString = JSON.stringify(this.form.value, null, '    ');
  }

  public addValues() {
    // this.values =
    this.form.value = JSON.parse(this.valuesString);
  }

  ngOnInit() {
    this.recuperarDados();
  }

  getCurrentFormValue() {
    return JSON.stringify(this.form.value, null, '    ');
  }

  loadData() {
    this.addValues();
  }

  carregar(name: string) {
    let url = '';
    if (environment.production) {
      // url = 'dynforms/';
    }

    console.log("URL: " + url);

    this.http.get<any>(url + 'assets/forms/' + name + '.json').pipe(tap(p => {
      this.regConfig = p;
      this.recuperarDados();
      // console.log(p)
  })).subscribe();
  }
}
