import { merge, Observable, Subscription } from 'rxjs';
import { AcoesService } from './acoes.service';
import { Acoes } from './modelo/acoes';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import {filter, map, pluck, switchMap, tap} from 'rxjs/operators';


@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {
  // implements OnInit, OnDestroy{
  acoesInput = new FormControl();
  todasAcoes$ = this.acoesService.getAcoes().pipe(tap(() => console.log("fluxo inicial")))
  filtroPeloInput$ = this.acoesInput.valueChanges.pipe(
    tap(()=> {console.log("fluxo do filtro")}),
    tap(console.log),
    filter((valorDigitado) => valorDigitado.length >= 3 || !valorDigitado.length),
    switchMap((valorDigitado) => this.acoesService.getAcoes(valorDigitado))
  );
  // acoes: Acoes;
  acoes$ = merge(this.todasAcoes$,this.filtroPeloInput$);
  // private sub: Subscription;


  constructor(private acoesService: AcoesService) {}

  // ngOnInit(): void {

  //   // this.sub = this.acoesService.getAcoes().subscribe((acoes) => {
  //   //   this.acoes = acoes;
  //   // })
  // }

  // ngOnDestroy(): void {
  //   // this.sub.unsubscribe();
  // }

}
