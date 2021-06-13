import { Observable, Subscription } from 'rxjs';
import { AcoesService } from './acoes.service';
import { Acoes } from './modelo/acoes';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import {map, pluck, switchMap, tap} from 'rxjs/operators';


@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {
  // implements OnInit, OnDestroy{
  acoesInput = new FormControl();
  // acoes: Acoes;
  acoes$ = this.acoesInput.valueChanges.pipe(
    tap(console.log),
    switchMap((valorDigitado) => this.acoesService.getAcoes(valorDigitado)),
    tap(console.log)
    //switchmap muda o fluxo, retornando um novo observable
    );
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
