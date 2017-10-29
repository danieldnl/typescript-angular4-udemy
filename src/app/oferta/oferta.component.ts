import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertasService]
})
export class OfertaComponent implements OnInit {

  private tempoObservableSubscription: Subscription
  private meuObservableTesteSubscription: Subscription
  public oferta: Oferta
  
  constructor(private route: ActivatedRoute, private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertasService.getOfertaPorId(this.route.snapshot.params['id'])
    .then((oferta: Oferta) => {
      this.oferta = oferta
    })

    /* this.route.params.subscribe(
      (parametro: any) => {console.log(parametro)},
      (erro: any) => console.log(erro),
      () => console.log('processamento classificado como concluído!')
    ) */

    let tempo = Observable.interval(1000)
    this.tempoObservableSubscription = tempo.subscribe(function(intervalo: number) {
      console.log(intervalo)
    })

    //Observable(Observavel)
    let meuObservavel = Observable.create((observer: Observer<number>) => {
      observer.next(1)
      observer.next(3)
      observer.complete()
      observer.next(4)
    })

    //Observable(Observador)
    this.meuObservableTesteSubscription = meuObservavel.subscribe(
      (resultado: any) => console.log(resultado + 15),
      (erro: string) => console.log(erro),
      () => console.log('Stream de eventos finalizada!')
    )
  }

  ngOnDestroy() {
    this.meuObservableTesteSubscription.unsubscribe()
    this.tempoObservableSubscription.unsubscribe()
  }

}
