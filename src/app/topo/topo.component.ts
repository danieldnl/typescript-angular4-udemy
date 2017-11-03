import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Observable } from 'rxjs/Observable';
import { Oferta } from '../shared/oferta.model';
import { Subject } from 'rxjs/Subject';

import '../util/rxjs-extensions'

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>
  public ofertas2: Oferta[]
  private subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa //retorno Oferta[]
      .debounceTime(1000) //executa a ação do swirchMap após 1 segundo
      .distinctUntilChanged()
      .switchMap((termo: string) => {
        if (termo.trim() === '') {
          //retornar um Obsevable de array de Ofertas vazio
          return Observable.of<Oferta[]>([])
        }
        return this.ofertasService.pesquisarOfertas(termo)
      })
      .catch((err: any) => {
        return Observable.of<Oferta[]>([])
      })
  }

  public pesquisar(termo: string): void {
    this.subjectPesquisa.next(termo)
  }

  public limparPesquisa(): void {
    this.subjectPesquisa.next('')
  }

}
