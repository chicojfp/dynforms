import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).then((module) => {
  // console.log('0000000000000000000000000000');
  // console.log(module.injector);

  // if (!window['rootInjector']) window['rootInjector'] = module.injector;
})
  .catch(err => console.log(err));
