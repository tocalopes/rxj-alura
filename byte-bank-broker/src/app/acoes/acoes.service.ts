import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, pluck, tap} from 'rxjs/operators';
import { Acao } from './modelo/acoes';

@Injectable({
  providedIn: 'root'
})
export class AcoesService {

  constructor(private http: HttpClient) { }

  getAcoes(valor?: string){
    const params = valor ? new HttpParams().append('valor',valor) : undefined
    return this.http.get<any>('http://localhost:3000/acoes',{params})
      .pipe(
        tap((valor) => console.log(valor)),
        pluck('payload'),
        //pluck extrai um atributo direto
        // map((api) => api.payload),
        map(acoes => acoes.sort((acaoA,acaoB) => this.ordenaPorCodigo(acaoA,acaoB)))
      );
    }

  private ordenaPorCodigo(acaoA: Acao, acaoB: Acao) {
    if(acaoA.codigo > acaoB.codigo){
      return 1;
    }
    if(acaoA.codigo < acaoB.codigo){
      return -1;
    }
    return 0;

  }

}
