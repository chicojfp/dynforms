import { Observable, of, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Injector, OnInit } from '@angular/core';
import { catchError, map } from 'rxjs/operators';

export abstract class BaseCrud implements OnInit {
    protected route: ActivatedRoute;
    protected searchQueryParams$: Observable<any>;

    private subscriptions: Subscription = new Subscription();

    constructor(protected injector: Injector) {
        this.route = this.injector.get(ActivatedRoute);

        this.searchQueryParams$ = this.route.queryParams as Observable<any>;
    }

    ngOnInit() {
      this.subscriptions.add(this.searchQueryParams$.pipe(
        // tap(() => this.isLoadingResults = true),
        map(resultadoRest => {
            if (resultadoRest instanceof Array) {
              // this.totalRegistros = resultadoRest.length;
              return resultadoRest;
            } else {
              // this.totalRegi÷stros = resultadoRest.totalRegistros;
              return resultadoRest.resultado;
            }
          }),
        catchError(() => {
          return of([]); // TODO mostrar mensagem de erro
        })
      ).subscribe(arrayResultado => {
        // this.isLoadingResults = false;
        // this.resultado = arrayResultado;
      }));
    }
}
